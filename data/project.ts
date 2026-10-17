export type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "CrypTrade",
    description:
      "Live crypto market dashboard showing top coins, market cap, 24h change and trading volume from the CoinGecko API.",
    image: "/projects/cryptrade.png",
    stack: ["Next.js", "TypeScript"],
    live: "https://...",
    github: "https://github.com/abizec-p/...",
  },
  {
    title: "TasteHome",
    description:
      "Full-stack food marketplace with a custom-built auth system, protected routes and Supabase row-level security.",
    image: "/projects/tastehome.png",
    stack: ["Next.js", "TypeScript", "Supabase"],
    live: "https://...",
    github: "https://github.com/abizec-p/...",
  },
  {
    title: "Ex-track",
    description:
      "Full-stack expense tracker built with the MERN stack for logging and keeping tabs on spending.",
    image: "/projects/extrack.png",
    stack: ["React.js", "Jsx", "Supabase"],
    live: "https://...",
    github: "https://github.com/abizec-p/...",
  },
  {
    title: "Next.js App router",
    description:
      "Dashboard app built with the Next.js App Router, covering nested layouts, server components, data fetching and authentication.",
    image: "/projects/acme.png",
    stack: ["Next.js", "TypeScript", "Supabase"],
    live: "https://...",
    github: "https://github.com/abizec-p/...",
  },
];
