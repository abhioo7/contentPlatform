// Discriminated union types for structured story content blocks

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}

export type StoryBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock;

export interface StoryContent {
  version: 1;
  blocks: StoryBlock[];
}
