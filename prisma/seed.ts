import { PrismaClient } from "@prisma/client";
import type { StoryContent } from "../src/types/story";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database…");

  // Clear existing data (order matters due to FK constraints)
  await prisma.story.deleteMany();
  await prisma.company.deleteMany();

  // -----------------------------------------------------------------------
  // Companies
  // -----------------------------------------------------------------------

  const microsoft = await prisma.company.create({
    data: {
      name: "Microsoft",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
      industry: "Technology",
      summary:
        "Microsoft is a global technology leader known for Windows, Azure cloud services, Office 365, GitHub, and enterprise software that empowers people and organizations worldwide.",
      employeeCount: 221000,
      foundedYear: 1975,
      websiteUrl: "https://www.microsoft.com",
      headquarters: "Redmond, Washington, USA",
    },
  });

  const tesla = await prisma.company.create({
    data: {
      name: "Tesla",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/512px-Tesla_T_symbol.svg.png",
      industry: "Electric Vehicles & Energy",
      summary:
        "Tesla accelerates the world's transition to sustainable energy through electric vehicles, solar energy, and integrated renewable energy solutions for homes and businesses.",
      employeeCount: 127855,
      foundedYear: 2003,
      websiteUrl: "https://www.tesla.com",
      headquarters: "Austin, Texas, USA",
    },
  });

  const apple = await prisma.company.create({
    data: {
      name: "Apple",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png",
      industry: "Consumer Electronics & Software",
      summary:
        "Apple designs and markets consumer electronics, software, and online services. Products include iPhone, Mac, iPad, Apple Watch, and Apple Silicon, underpinned by a tightly integrated hardware-software ecosystem.",
      employeeCount: 164000,
      foundedYear: 1976,
      websiteUrl: "https://www.apple.com",
      headquarters: "Cupertino, California, USA",
    },
  });

  const nvidia = await prisma.company.create({
    data: {
      name: "Nvidia",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Simple_nvidia_logo.svg/512px-Simple_nvidia_logo.svg.png",
      industry: "Semiconductors & AI",
      summary:
        "Nvidia pioneered GPU-accelerated computing and is now the world's leading AI infrastructure company, powering data centres, autonomous vehicles, robotics, and scientific research globally.",
      employeeCount: 36000,
      foundedYear: 1993,
      websiteUrl: "https://www.nvidia.com",
      headquarters: "Santa Clara, California, USA",
    },
  });

  // -----------------------------------------------------------------------
  // Stories
  // -----------------------------------------------------------------------

  const stories: Array<{
    title: string;
    content: StoryContent;
    published: boolean;
    publishedAt: Date | null;
    companyId: string;
  }> = [
    // Microsoft
    {
      title: "Microsoft Azure Reaches 1 Million Active Customers",
      companyId: microsoft.id,
      published: true,
      publishedAt: new Date("2025-03-10"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Microsoft Azure Reaches 1 Million Active Customers",
          },
          {
            type: "paragraph",
            text: "Microsoft Azure has crossed the remarkable milestone of one million active customers, cementing its position as the second-largest cloud platform in the world behind Amazon Web Services.",
          },
          {
            type: "heading",
            level: 2,
            text: "Why Enterprises Choose Azure",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Deep integration with Microsoft 365 and Active Directory",
              "Hybrid cloud capabilities with Azure Arc",
              "Industry-leading compliance and sovereignty controls",
              "AI services powered by OpenAI partnership",
            ],
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
            alt: "Global cloud computing network visualization",
          },
          {
            type: "paragraph",
            text: "Azure's growth has been particularly strong in the financial services, healthcare, and government verticals, where security and compliance requirements are most stringent.",
          },
        ],
      },
    },
    {
      title: "GitHub Copilot Transforms How Developers Write Code",
      companyId: microsoft.id,
      published: true,
      publishedAt: new Date("2025-06-01"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "GitHub Copilot Transforms How Developers Write Code",
          },
          {
            type: "paragraph",
            text: "GitHub Copilot has become the world's most widely adopted AI coding assistant, with more than two million paid subscribers and tens of thousands of enterprise organisations integrating it into their software development workflows.",
          },
          {
            type: "heading",
            level: 2,
            text: "Key Productivity Gains",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "46% of code written by Copilot users accepted without modification",
              "55% faster task completion on well-defined coding problems",
              "Reduced context-switching between documentation and editor",
              "Better test coverage through automatic test suggestion",
            ],
          },
          {
            type: "paragraph",
            text: "Microsoft continues to invest heavily in the underlying AI models, recently rolling out support for multi-file context windows and natural-language slash commands inside pull requests.",
          },
        ],
      },
    },
    {
      title: "Microsoft's Responsible AI Principles: One Year On",
      companyId: microsoft.id,
      published: false,
      publishedAt: null,
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Microsoft's Responsible AI Principles: One Year On",
          },
          {
            type: "paragraph",
            text: "This draft explores how Microsoft's six responsible AI principles — fairness, reliability, privacy, inclusiveness, transparency, and accountability — have influenced product decisions across Azure AI, Bing, and GitHub Copilot.",
          },
        ],
      },
    },
    // Tesla
    {
      title: "Tesla Cybertruck Deliveries Cross 100,000 Units",
      companyId: tesla.id,
      published: true,
      publishedAt: new Date("2025-04-15"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Tesla Cybertruck Deliveries Cross 100,000 Units",
          },
          {
            type: "paragraph",
            text: "Tesla has officially delivered more than 100,000 Cybertruck units in North America, marking a significant manufacturing ramp milestone for the stainless-steel electric pickup.",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1611095564985-9495cd9dc68f?w=1200",
            alt: "Electric vehicle charging station at sunset",
          },
          {
            type: "heading",
            level: 2,
            text: "Cybertruck by the Numbers",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Up to 340 miles of range on the Cyberbeast tri-motor variant",
              "845 horsepower in the Cyberbeast configuration",
              "0–60 mph in 2.6 seconds",
              "Standard air suspension with 17.3-inch ground clearance mode",
            ],
          },
          {
            type: "paragraph",
            text: "Production at Gigafactory Texas has nearly doubled quarter-over-quarter as Tesla resolves early supply chain challenges with the exoskeleton panel stamping process.",
          },
        ],
      },
    },
    {
      title: "Tesla Autopilot vs. Full Self-Driving: What's the Difference?",
      companyId: tesla.id,
      published: true,
      publishedAt: new Date("2025-05-20"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Tesla Autopilot vs. Full Self-Driving: What's the Difference?",
          },
          {
            type: "paragraph",
            text: "Two of Tesla's most talked-about features — Autopilot and Full Self-Driving (FSD) — are often confused. This deep-dive explains what each system does today, how they differ, and where Tesla's autonomy roadmap is heading.",
          },
          {
            type: "heading",
            level: 2,
            text: "Autopilot",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Included on all new Tesla vehicles at no extra cost",
              "Traffic-Aware Cruise Control and Autosteer on divided highways",
              "Requires hands on wheel and eyes on road at all times",
            ],
          },
          {
            type: "heading",
            level: 2,
            text: "Full Self-Driving (Supervised)",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Monthly subscription or one-time purchase",
              "City streets, unprotected turns, traffic signals",
              "Driver must remain attentive and ready to take control",
              "Enabled by a 4D neural network trained on real-world fleet data",
            ],
          },
          {
            type: "paragraph",
            text: "Tesla's next milestone is unsupervised FSD, which the company expects to roll out in limited geographies as regulatory approvals proceed.",
          },
        ],
      },
    },
    // Apple
    {
      title: "Apple Silicon M4: Performance Meets Efficiency",
      companyId: apple.id,
      published: true,
      publishedAt: new Date("2025-05-07"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Apple Silicon M4: Performance Meets Efficiency",
          },
          {
            type: "paragraph",
            text: "Apple's M4 chip family brings unprecedented compute performance to the Mac and iPad Pro lineup, with up to 38-core GPU configurations and the company's fastest Neural Engine to date.",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
            alt: "Modern laptop on a minimalist desk",
          },
          {
            type: "heading",
            level: 2,
            text: "What's New in M4",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Second-generation 3-nanometre process node",
              "Up to 512 GB of unified memory in the M4 Ultra",
              "4× faster machine learning than M1",
              "Hardware ray-tracing for pro graphics workloads",
            ],
          },
          {
            type: "paragraph",
            text: "Benchmarks show the base M4 MacBook Pro outperforming the previous M3 Max in multi-core workloads while drawing 30% less power — a testament to Apple's continued leadership in silicon design.",
          },
        ],
      },
    },
    // Nvidia
    {
      title: "Nvidia Blackwell GPUs Power the Next Wave of AI Data Centres",
      companyId: nvidia.id,
      published: true,
      publishedAt: new Date("2025-04-02"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "Nvidia Blackwell GPUs Power the Next Wave of AI Data Centres",
          },
          {
            type: "paragraph",
            text: "Nvidia's Blackwell architecture represents the biggest generational leap in GPU compute since the Ampere-to-Hopper transition, delivering up to 30× faster inference throughput for large language models compared with the H100.",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200",
            alt: "High-performance server racks in a modern data centre",
          },
          {
            type: "heading",
            level: 2,
            text: "Blackwell Architecture Highlights",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "208 billion transistors on a dual-die design",
              "NVLink 5: 1.8 TB/s GPU-to-GPU bandwidth",
              "FP4 precision for inference — 5× efficiency vs FP8",
              "Confidential Computing support for multi-tenant AI clouds",
            ],
          },
          {
            type: "heading",
            level: 2,
            text: "Customer Adoption",
          },
          {
            type: "paragraph",
            text: "Microsoft, Google, Amazon, and Oracle have all announced GB200 cluster deployments exceeding 10,000 GPUs, cementing Nvidia's position as the infrastructure backbone of the AI economy.",
          },
        ],
      },
    },
    {
      title: "How Nvidia CUDA Became the Programming Standard for AI",
      companyId: nvidia.id,
      published: true,
      publishedAt: new Date("2025-02-14"),
      content: {
        version: 1,
        blocks: [
          {
            type: "heading",
            level: 1,
            text: "How Nvidia CUDA Became the Programming Standard for AI",
          },
          {
            type: "paragraph",
            text: "CUDA, Nvidia's parallel computing platform first released in 2006, now underpins virtually every major AI framework — PyTorch, TensorFlow, JAX, and beyond. Its dominance is no accident.",
          },
          {
            type: "heading",
            level: 2,
            text: "CUDA's Moat",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "18 years of library optimisations (cuDNN, cuBLAS, NCCL)",
              "First-mover advantage: researchers standardised on CUDA before alternatives matured",
              "Tight hardware-software co-design enables single-digit-percent efficiency gains per release",
              "Ecosystem lock-in through CUDA-specific primitives in popular frameworks",
            ],
          },
          {
            type: "paragraph",
            text: "Competitors like AMD ROCm and Intel OneAPI have made meaningful progress, but switching costs and the depth of the CUDA library ecosystem remain substantial barriers to displacement.",
          },
        ],
      },
    },
  ];

  for (const story of stories) {
    await prisma.story.create({
      data: {
        title: story.title,
        companyId: story.companyId,
        published: story.published,
        publishedAt: story.publishedAt,
        // Cast through unknown to satisfy Prisma's InputJsonValue requirement
        content: story.content as unknown as Parameters<
          typeof prisma.story.create
        >[0]["data"]["content"],
      },
    });
  }

  console.log(
    `Seeded ${await prisma.company.count()} companies and ${await prisma.story.count()} stories.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
