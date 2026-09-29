import Image from "next/image";
import type {
  StoryBlock,
  StoryContent,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
  ListBlock,
} from "@/types/story";

// ---------------------------------------------------------------------------
// Individual block renderers
// ---------------------------------------------------------------------------

function HeadingRenderer({ block }: { block: HeadingBlock }) {
  const className = "font-bold text-gray-900 mt-8 mb-3 leading-tight";

  if (block.level === 1) {
    return <h1 className={`text-3xl ${className}`}>{block.text}</h1>;
  }
  if (block.level === 2) {
    return <h2 className={`text-2xl ${className}`}>{block.text}</h2>;
  }
  return <h3 className={`text-xl ${className}`}>{block.text}</h3>;
}

function ParagraphRenderer({ block }: { block: ParagraphBlock }) {
  return (
    <p className="text-gray-700 leading-relaxed text-base my-4">{block.text}</p>
  );
}

function ImageRenderer({ block }: { block: ImageBlock }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200">
        <Image
          src={block.url}
          alt={block.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {block.alt && (
        <figcaption className="mt-2 text-center text-xs text-gray-500">
          {block.alt}
        </figcaption>
      )}
    </figure>
  );
}

function ListRenderer({ block }: { block: ListBlock }) {
  const className = "my-4 pl-6 space-y-1.5 text-gray-700 text-base";

  if (block.ordered) {
    return (
      <ol className={`${className} list-decimal`}>
        {block.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className={`${className} list-disc`}>
      {block.items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Block dispatcher
// ---------------------------------------------------------------------------

function BlockRenderer({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "heading":
      return <HeadingRenderer block={block} />;
    case "paragraph":
      return <ParagraphRenderer block={block} />;
    case "image":
      return <ImageRenderer block={block} />;
    case "list":
      return <ListRenderer block={block} />;
    default:
      // Exhaustive check — TypeScript will warn if a new type is added but not handled.
      return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

interface StoryRendererProps {
  content: StoryContent;
}

export default function StoryRenderer({ content }: StoryRendererProps) {
  if (!content.blocks || content.blocks.length === 0) {
    return (
      <p className="text-gray-500 italic">This story has no content yet.</p>
    );
  }

  return (
    <article className="prose-custom">
      {content.blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </article>
  );
}
