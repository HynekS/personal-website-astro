import groq from "groq"
// import client from "../sanity/client"
import { getClient } from "../sanity"
import { GetStaticProps } from "next"

interface Props {
  post: {
    title: string
    description: string
  }
}

const About: React.FC<Props> = ({ post = {} }) => {
  const { title = "", description = "" } = post
  return (
    <article>
      <h1>{title}</h1>
      <main>{description}</main>
    </article>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      post: await getClient().fetch(groq`
    *[_type == "about"][0]
  `),
    },
  }
}

export default About
