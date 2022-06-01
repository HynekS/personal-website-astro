import Link from "next/link"
import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { NextSeo } from "next-seo"
import tw from "twin.macro"

import { InferGetStaticPropsType } from "next"

import type { Meta } from "../pages/blog/[slug]"

import Container from "@/components/Container"
import PrettyDate from "@/components/PrettyDate"

const DESCRIPTION = "A blog featurnig posts about React, Next.js, front-end development & more."

const Index = ({ links = [] }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const sortedLinks = links
    .slice()
    .sort((a, b) => (new Date(String(a.dateCreated)) < new Date(String(b.dateCreated)) ? 1 : -1))

  return (
    <>
      <NextSeo
        title={"Blog | HynekS"}
        description={DESCRIPTION}
        openGraph={{
          //url: "https://www.url.ie/a",
          title: "Blog | HynekS",
          description: DESCRIPTION,
          //...getFeaturedImage(slug, meta),
          //site_name: "HynekS",
          type: "website",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Container>
        <div tw="h-full px-4 mx-auto max-w-prose light:(text-secondary)">
          <h1 tw="text-4xl font-bold">Blog</h1>
          {sortedLinks.length ? (
            <ul tw="mt-4 list-none">
              {sortedLinks.map(link => (
                <li
                  tw="relative flex flex-col md:(flex-row) mt-8 p-4 pb-6 rounded-md dark:(background-color[#2a3340] shadow-sm) light:after:(w-full left-0 height[1px] absolute bottom[-1.25rem] background[linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 33%, rgba(166,166,166,0.3) 100%)])"
                  key={link.title}
                >
                  {link.featuredImage ? (
                    <div tw="md:(max-width[6em] mr-6) flex[1 0 4em]">
                      <Link href={"/blog/" + link.slug}>
                        <img
                          tw="object-cover rounded-full width[4em] height[4em] mb-3 mr-4 dark:(filter[brightness(0.75) contrast(1.1)] border-4 border-color[#656a72]) light:(opacity-90 border-4 border-gray-200) md:(mt-3)"
                          src={require(`_mdx_/${link.slug}/${link.featuredImage}?resize&size=80`)}
                          alt="thumbnail"
                          srcSet={
                            require(`_mdx_/${link.slug}/${link.featuredImage}?resize&size=80`)
                              .srcSet
                          }
                        />
                      </Link>
                    </div>
                  ) : null}
                  <div>
                    <h2 tw="text-3xl font-semibold">
                      <Link href={"/blog/" + link.slug}>{link.title}</Link>
                    </h2>
                    {link.categories ? (
                      <ul tw="flex gap-1.5 mt-1">
                        {link.categories.map(category => (
                          <li
                            tw="font-mono text-xs rounded-md py-0.5 px-1.5 dark:(bg-gray-800) light:(bg-gray-100)"
                            key={category}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span tw="font-mono text-sm pl-1 dark:(text-gray-400)">
                      posted{" "}
                      <PrettyDate
                        date={new Date(link.dateCreated)}
                        dateStyles={tw`text-sm dark:(text-gray-400)`}
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "_mdx_")
  const filenames = fs.readdirSync(postsDirectory)

  const links = filenames
    .filter(path => fs.existsSync(`${process.cwd()}/_mdx_/${path}/index.mdx`))
    .map(path => {
      const rawContents = fs.readFileSync(`${process.cwd()}/_mdx_/${path}/index.mdx`, "utf8")
      const { data: meta }: { data: Meta } = matter(rawContents)
      return { ...meta, slug: path }
    })

  return {
    props: {
      links,
    },
  }
}

export default Index
