import { z, defineCollection } from "astro:content";
/*
const publishedBlogpostSchema = z.object({
  title: z.string(),
  author: z.enum(["Hynek Svacha"]),
  // TODO: consider removing
  type: z.literal("blog post"),
  dateCreated: z.string().transform((str) => new Date(str)),
  dateLastModified: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),

  featuredImage: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  keywords: z.array(z.string()).nullable(),
  description: z.string(),
  draft: z.literal(null),
});
*/

const publishedBlogpostBaseSchema = z.object({
  title: z.string(),
  author: z.enum(["Hynek Svacha"]),
  // TODO: consider removing
  type: z.literal("blog post"),
  dateCreated: z.string().transform((str) => new Date(str)),
  dateLastModified: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),

  featuredImage: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  keywords: z.array(z.string()).nullable(),
  description: z.string(),
  //draft: z.literal(null),
});

const publishedBlogpostBaseSchemaNullDraft = publishedBlogpostBaseSchema.extend(
  {
    draft: z.literal(null),
  }
);

const publishedBlogpostBaseSchemaUndefinedDraft =
  publishedBlogpostBaseSchema.extend({
    draft: z.literal(undefined),
  });

const publishedBlogpostBaseSchemaFalsedDraft =
  publishedBlogpostBaseSchema.extend({
    draft: z.literal(false),
  });

const draftBlogpostSchema = z.object({
  title: z.string().nullable(),
  author: z.enum(["Hynek Svacha"]),
  // TODO: consider removing
  type: z.literal("blog post"),
  dateCreated: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  dateLastModified: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  featuredImage: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  keywords: z.array(z.string()).nullable(),
  description: z.string().nullable(),
  draft: z.literal(true),
});

const blogCollection = defineCollection({
  schema: z.discriminatedUnion("draft", [
    publishedBlogpostBaseSchemaNullDraft,
    publishedBlogpostBaseSchemaUndefinedDraft,
    publishedBlogpostBaseSchemaFalsedDraft,
    draftBlogpostSchema,
  ]),
});

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.enum(["Hynek Svacha"]),
    // TODO: consider removing
    type: z.literal("project"),
    dateCreated: z.string().transform((str) => new Date(str)),
    dateLastModified: z
      .string()
      .transform((str) => new Date(str))
      .nullable(),
    featuredImage: z.string().nullable(),
    categories: z.array(z.string()).nullable(),
    keywords: z.array(z.string()).nullable(),
    description: z.string().nullable(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
