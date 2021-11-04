import sanityClient from "@sanity/client"

export default sanityClient({
  projectId: "ztw29a4z",
  dataset: "production",
  useCdn: true,
})
