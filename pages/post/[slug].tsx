import { useRef } from "react"
import groq from "groq"
import BlockContent from "@sanity/block-content-to-react"
import readingTime from "reading-time"
import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"

import { fetchTweetAst } from "static-tweets"
import "react-static-tweets/styles.css"

import client from "@/sanity/client"
import serializers from "@/sanity/serializers"
import { urlFor } from "@/sanity/index"
import * as Schema from "../../../studio/schema"

import Container from "@/components/Container"
import LazyImage from "@/components/LazyImage"
import PublishDate from "@/components//PublishDate"
import RecursiveList, {
  buildTree,
  checkIfNestingIsValid,
  prepareHeadings,
} from "@/components/RecursiveList"
import useObserveActiveSection from "@/hooks/useObserveActiveSection"

type Base64 = string
type PostProps = Omit<Schema.Post, "author" | "categories" | "mainImage"> & {
  name: Pick<Schema.Post, "author">
  categories: Array<Pick<Schema.Category, "_id" | "title">>
  mainImage: Schema.Post["mainImage"] & {
    lqip: Base64
    aspectRatio: number
  }
  timeToRead: string
}

const Post = ({ post }: { post: PostProps }): JSX.Element => {
  const articleRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useObserveActiveSection(navRef, articleRef)

  const {
    title = "Missing title",
    name = "Missing name",
    description = "No description",
    categories = [],
    _createdAt = "",
    mainImage,
    body = [],
    timeToRead,
  } = post

  const preparedHeadings = prepareHeadings(body)

  const tree = checkIfNestingIsValid(preparedHeadings, "level") ? buildTree(preparedHeadings) : null

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={name.toString()} />
        <meta property="article:published_time" content={_createdAt} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <RecursiveList tree={tree} ref={navRef}></RecursiveList>
        <article
          ref={articleRef}
          tw="prose prose-sm mx-auto pt-8 px-4 md:(prose) lg:(prose-lg px-0) dark:(prose-dark)"
        >
          <h1>{title}</h1>
          {mainImage && (
            <LazyImage
              src={urlFor(mainImage).width(800).auto("format").url()}
              lqip={mainImage.lqip}
              aspectRatio={mainImage.aspectRatio}
              alt={mainImage.alt || ""}
            />
          )}
          {_createdAt && <PublishDate createdAt={_createdAt} />}
          <span>By {name}</span>
          <span>{timeToRead}</span>
          {categories && (
            <div>
              Posted in:
              <ul tw="flex flex-wrap mt-0!">
                {categories.map(category => (
                  <li
                    tw="bg-secondary rounded mr-2 py-1! px-2! before:hidden! text-base!"
                    key={category._id}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <BlockContent
            blocks={body}
            imageOptions={{ w: 600, h: 600, fit: "max" }}
            serializers={serializers}
            {...client.config()}
          />
        </article>
      </main>
    </Container>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
	title,
	"name" : author->name,
  _createdAt,
  _updatedAt,
  description,
  mainImage{
    ...,
    "lqip": asset->metadata.lqip,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
  },
  categories[]->{
    _id,
    title,
  },
	body[]{
    ...,
    _type == "figure" => {
       "lqip": @.asset->metadata.lqip,
       "aspectRatio": @.asset->metadata.dimensions.aspectRatio, 
    },
  },
}`

const queryAll = `*[_type == "post" && slug.current != ''] {
  'slug': slug.current
}
`

export const getStaticProps: GetStaticProps = async function (context) {
  const post = await client.fetch(query, { slug: context.params.slug })

  // This is very raw and dirty MVP (e.g. it omits blockquote type)
  const justText: string = post.body.reduce((text: string, block) => {
    if (block.children && block.children.length) {
      block.children.forEach(child => {
        text += String(child.text).padStart(1, " ")
      })
      return text
    }
    if (block.code) {
      text += String(block.code).padStart(1, " ")
      return text
    }
    return text
  }, "")

  const { text: timeToRead } = readingTime(justText)

  const withTweetAst = await Promise.all(
    post.body.map(async block => {
      if (block._type !== "twitter") {
        return block
      } else {
        try {
          const tweetAst = await fetchTweetAst(block.id)
          return {
            ...block,
            ast: tweetAst,
          }
        } catch (err) {
          console.error("error fetching tweet info", err)
          return {
            ...block,
            ast: null,
          }
        }
      }
    }),
  )

  return {
    props: {
      post: {
        ...post,
        timeToRead,
        body: withTweetAst,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = (await client.fetch(queryAll)) || []
  const paths = pages.map(page => ({
    params: { slug: page.slug },
  }))
  return { paths, fallback: false }
}

export default Post
