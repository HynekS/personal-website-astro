import Link from "next/link"
import groq from "groq"

import { getClient } from "../sanity"
import { GetStaticProps } from "next"

import { urlFor } from "@/sanity/index"
import Container from "../components/Container"

import * as Schema from "../../studio/schema"

type Posts = Array<
  Omit<Schema.Post, "categories"> & {
    categories: Array<Pick<Schema.Category, "_id" | "title">>
  }
>

const Index = ({ posts = [] }: { posts: Posts }): JSX.Element => {

  return (
    <Container>
      <div tw="max-w-prose mx-auto h-full">
        <h1 tw="text-4xl">Welcome to a blog!</h1>
        {posts.length ? (
          <ul tw="list-none">
            {posts.map(
              ({
                _id,
                title = "",
                slug = { current: "" },
                _createdAt = "",
                _updatedAt = "",
                mainImage,
                categories = [],
              }) =>
                slug && (
                  <li tw="flex pb-8" key={_id}>
                    {mainImage && (
                      <Link href={`/post/${slug.current}`}>
                        <img tw="rounded px-4" src={urlFor(mainImage).width(100).url()} />
                      </Link>
                    )}
                    <Link href={`/post/${slug.current}`}>
                      <a>
                        <h2 tw="text-lg px-4">{title}</h2>
                      </a>
                    </Link>
                    {categories.length ? (
                      <ul tw="flex list-none text-xs">
                        {categories.map(category => (
                          <li key={category._id}>{category.title}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ),
            )}
          </ul>
        ) : null}
        <Link href="/about" as={`/about`}>
          <a>About Me</a>
        </Link>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: await getClient().fetch(groq`
    *[_type == "post"]{
      ...,
      categories[]->{
        _id,
        title,
      },
    }
  `),
    },
  }
}

export default Index
