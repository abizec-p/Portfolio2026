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
    live: "https://cryptrade-seven.vercel.app/",
    github: "https://github.com/abizec-p/cryptrade",
  },
  {
    title: "TasteHome",
    description:
      "Full-stack food marketplace with a custom-built auth system, protected routes and Supabase row-level security.",
    image: "/projects/tastehome.png",
    stack: ["Next.js", "TypeScript", "Supabase"],
    live: "https://taste-home.vercel.app/",
    github: "https://github.com/abizec-p/TasteHome",
  },
  {
    title: "Ex-track",
    description:
      "Full-stack expense tracker built with the MERN stack for logging and keeping tabs on spending.",
    image: "/projects/extrack.png",
    stack: ["React.js", "Jsx", "Supabase"],
    live: "https://expentrackapp.netlify.app/",
    github: "https://github.com/abizec-p/expensetracker",
  },
  {
    title: "Next.js App router",
    description:
      "Dashboard app built with the Next.js App Router, covering nested layouts, server components, data fetching and authentication.",
    image: "/projects/acme.png",
    stack: ["Next.js", "TypeScript", "Supabase"],
    live: "https://nextjs-learn-pearl-three.vercel.app/",
    github: "https://github.com/abizec-p/NextjsLearn",
  },
  {
    title: "Calculator App",
    description:
      "A responsive calculator app supports 6 different types of calculator like age calculator, calories",
    image: "/projects/calculator.png",
    stack: ["react.js", "jsx"],
    live: "https://calculatemate.netlify.app/",
    github: "https://github.com/abizec-p/calculate-app",
  },
];
