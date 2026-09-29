import { z } from "zod";

// ---------------------------------------------------------------------------
// Story block schemas (discriminated union mirrors src/types/story.ts)
// ---------------------------------------------------------------------------

const HeadingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  text: z.string().min(1),
});

const ParagraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().min(1),
});

const ImageBlockSchema = z.object({
  type: z.literal("image"),
  url: z.string().url("Image URL must be a valid URL"),
  alt: z.string(),
});

const ListBlockSchema = z.object({
  type: z.literal("list"),
  ordered: z.boolean(),
  items: z.array(z.string()).min(1),
});

export const StoryBlockSchema = z.discriminatedUnion("type", [
  HeadingBlockSchema,
  ParagraphBlockSchema,
  ImageBlockSchema,
  ListBlockSchema,
]);

export const StoryContentSchema = z.object({
  version: z.literal(1),
  blocks: z.array(StoryBlockSchema),
});

// ---------------------------------------------------------------------------
// Story schemas
// ---------------------------------------------------------------------------

export const CreateStorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  companyId: z.string().min(1, "companyId is required"),
  content: StoryContentSchema,
});

export type CreateStoryInput = z.infer<typeof CreateStorySchema>;

// ---------------------------------------------------------------------------
// Company schemas
// ---------------------------------------------------------------------------

export const CreateCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().url("logoUrl must be a valid URL"),
  industry: z.string().min(1, "Industry is required"),
  summary: z.string().min(1, "Summary is required"),
  employeeCount: z
    .number()
    .int()
    .positive("employeeCount must be a positive integer"),
  foundedYear: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear(), "foundedYear cannot be in the future"),
  websiteUrl: z.string().url("websiteUrl must be a valid URL"),
  headquarters: z.string().min(1, "Headquarters is required"),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;
