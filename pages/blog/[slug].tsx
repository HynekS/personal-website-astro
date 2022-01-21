import React, { useRef, useState } from "react"
import Link from "next/link"
import { NextSeo } from "next-seo"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import matter from "gray-matter"
import slugify from "slugify"
import readingTime, { ReadTimeResults } from "reading-time"
import { preToCodeBlock } from "mdx-utils"
import { onlyText } from "react-children-utilities"
import path from "path"
import fs from "fs"
import { execSync } from "child_process"

import HighlightedCode from "@/components/HighlightedCode"
import Container from "@/components/Container"
import RecursiveList, { createTableOfContents } from "@/components/RecursiveList"
import Lightbox from "@/components/Lightbox"
import ScrollToTop from "@/components/ScrollToTop"
import PrettyDate from "@/components/PrettyDate"
import useObserveActiveSection from "@/hooks/useObserveActiveSection"

import type { ReactNode } from "react"
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

export type LinkProps = {
  href: string
  children: ReactNode
}

const InternalExternalLink = ({ href, children, ...props }: LinkProps) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
      {children}
    </a>
  )
}

export type ImageProps = {
  fileName: string
  alt: string
  slug: string
}

type HeadingTag = "h2" | "h3" | "h4" | "h5" | "h6"

const headings = ["h2", "h3", "h4", "h5", "h6"].map(headingTag => [
  headingTag,
  ({ children }: { children: ReactNode }) => {
    const idText = slugify(onlyText(children), { lower: true })
    const Tag = headingTag as HeadingTag

    return (
      <Tag id={idText}>
        <Link href={`#${idText}`}>
          <a>{children}</a>
        </Link>
      </Tag>
    )
  },
])

type Components = Record<HTMLElement["nodeName"], () => JSX.Element>

type ImgProps = {
  src: string
  alt: string
}

type PreProps = {
  children?: ReactNode
}

const components = (slug: string, meta: Meta): Components => ({
  ...Object.fromEntries(headings),
  h1: ({ children }: { children: ReactNode }) => {
    return (
      <>
        <h1>{children}</h1>
        <div tw="font-mono text-sm dark:(text-gray-400)">
          posted <PrettyDate date={new Date(meta.dateCreated)} /> ∙ by {meta.author} ∙{" "}
          {meta?.timeToRead?.text}
        </div>
      </>
    )
  },
  a: ({ href, children, ...props }: LinkProps) => (
    <InternalExternalLink href={href} children={children} {...props} />
  ),
  pre: (preProps: PreProps) => {
    const props = preToCodeBlock(preProps)

    if (props) {
      return <HighlightedCode {...props} />
    } else {
      return <pre {...preProps} />
    }
  },

  img: ({ src, alt = "", ...props }: ImgProps) => {
    return <Lightbox images={[{ src, alt }]} slug={slug} {...props} />
  },
})

export type Meta = {
  title?: string
  author?: string
  type?: string
  dateCreated?: string
  dateLastModified?: string
  featuredImage?: string
  categories?: string[]
  keywords?: string[]
  description?: string
  timeToRead?: ReadTimeResults
  gihubFileLink?: string
}

const getFeaturedImage = (slug: string, meta: Meta) => {
  try {
    require(`_mdx_/${slug}/${meta.featuredImage}`)
    return {
      images: [
        {
          url: require(`_mdx_/${slug}/${meta.featuredImage}`),
          width: 800,
          height: 600,
          alt: "featured image",
          type: "image/jpeg",
        },
      ],
    }
  } catch (error) {
    return
  }
}

export default function Post({
  source,
  slug,
  content,
  meta,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const articleRef = useRef<HTMLDivElement>(null!)
  const navRef = useRef<HTMLDivElement>(null!)
  const [scrollContainer, _] = useState<HTMLElement | Window | null>(() => {
    return process.browser ? window : null
  })

  useObserveActiveSection(navRef, articleRef)
  let toc = createTableOfContents(content)

  return (
    <>
      <NextSeo
        title={meta.title + " | HynekS"}
        description={meta.description ?? ""}
        openGraph={{
          //url: "https://www.url.ie/a",
          title: meta.title ?? "",
          description: meta.description ?? "",
          ...getFeaturedImage(slug, meta),
          //site_name: "HynekS",
          type: "article",
          article: {
            publishedTime: meta.dateCreated,
            ...(meta.dateLastModified && { modifiedTime: meta.dateLastModified }),
            authors: [meta.author],
            tags: meta.keywords,
          },
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Container>
        <aside tw="hidden md:(block w-1/5 pt-6)">
          {toc ? <RecursiveList tree={toc} ref={navRef}></RecursiveList> : null}
        </aside>
        <main tw="flex-auto max-w-full margin-right[calc((50% - 30ch)/2)]">
          <article
            ref={articleRef}
            tw="prose prose-sm mx-auto pt-8 px-4 md:(prose) lg:(prose-lg px-0) dark:(prose-dark) pb-16"
          >
            {meta.featuredImage ? (
              <img src={require(`_mdx_/${slug}/${meta.featuredImage}`)} />
            ) : null}
            <MDXRemote {...source} components={components(slug, meta)} scope={meta} />
            {meta.dateLastModified ? (
              <p>
                last modified <PrettyDate date={new Date(meta.dateLastModified)} />
              </p>
            ) : null}
            <hr />
            <p tw="text-base">
              If you find anything in this post that should be improved (either factually or
              linguistically), feel free to{" "}
              <a href={meta.gihubFileLink} rel="noopener noreferer" target="_blank">
                edit it on Github
              </a>
              .
            </p>
          </article>
        </main>
        <div id="fix-layout-jump" />
      </Container>
      <ScrollToTop treshold={640} scrollContainer={scrollContainer} />
    </>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
  const slug = String(context.params?.slug)
  const filePath = path.join(process.cwd(), `_mdx_/${slug}/index.mdx`)
  const rawContents = fs.readFileSync(filePath, "utf8")

  const githubRemote = execSync(`git remote get-url origin`).toString().replace(/\n$/, "")
  const remoteBranch = execSync(`git rev-parse --abbrev-ref HEAD`).toString().replace(/\n$/, "")

  const gihubFileLink = `${githubRemote}/edit/${remoteBranch}/_mdx_/${slug}/index.mdx`

  const allAuthorDates = execSync(
    `git log --follow --name-status --pretty=format:%aI -- ${filePath}`,
  ).toString()

  const [lastEditExceptPathChangeDate] = allAuthorDates.match(/20[\d-T:.Z+]+$(?!\r?\nR)/m) || []

  const { content, data: meta }: { content: string; data: Meta } = matter(rawContents)
  const timeToRead = readingTime(content)
  const mdxSource = await serialize(content, {
    scope: meta,
  })

  return {
    props: {
      source: mdxSource,
      slug,
      content,
      meta: {
        ...meta,
        timeToRead,
        dateLastModified: lastEditExceptPathChangeDate.toString(),
        gihubFileLink,
      },
    },
  }
}

export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "_mdx_")
  const filenames = fs.readdirSync(postsDirectory)

  const paths = filenames
    .filter(path => fs.existsSync(`${process.cwd()}/_mdx_/${path}/index.mdx`))
    .map(path => {
      const slug = path.split(".")[0]

      return {
        params: {
          slug,
        },
      }
    })

  return {
    paths,
    fallback: false,
  }
}
