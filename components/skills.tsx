export default function Skills() {
  return (
    <div className=" block md:flex justify-around gap-10 md:px-40 pt-30 h-[100%] md:h-150 text-neutral-200   bg-[radial-gradient(circle_at_center,#222838_0%,#0F1117_70%)]">
      <div className=" w-[90%] mx-5 md:mx-0 md:h-100 md:w-100 md:w-150 border border-neutral-200 rounded">
        <div className="flex justify-between bg-neutral-200 text-xl text-orange-500 px-5 py-4 border-b border-neutral-200">
          <h1 className="font-bold ">Skills </h1>
          <h1 className="font-bold">{"//"}</h1>
        </div>
        <div className=" *:border-b flex flex-col *:flex *:justify-between  md:gap-0   *:p-3 md:*:p-5 [&_h1]:font-light md:[&_h1]:font-bold [&_h1]:text-xs  md:[&_h1]:text-lg h-full   text-xs md:text-lg  [&_p]:font-extralight md:[&_p]:font-extralight">
          <div>
            <h1>Core Stack</h1>
            <p>Next.js,React.js,Typescript, Tailwind CSS</p>
          </div>
          <div>
            <h1>Backend</h1>
            <p>Node.js, Express.js, PostgreSQL, Supabase</p>
          </div>
          <div>
            <h1>Tools</h1>
            <p>Git, GitHub, Vercel, REST APIs</p>
          </div>
          <div>
            <h1>Design</h1>
            <p>Figma, Photoshop, Illustrator, Canva</p>
          </div>
          <div>
            <h1>Creative hobbies</h1>
            <p>Photography, Video Editing, Aquarium</p>
          </div>
        </div>
      </div>
      <div className="[&_span]:text-orange-400 [&_span]:font-bold w-70  md:w-140 text-[26px]">
        <h1 className="hidden md:block">
          I build full-stack web apps with <span>Next.js</span>,
          <span> TypeScript</span>, and <span>Supabase</span>, and I design the
          interfaces myself in Figma and Adobe tools. Being both a developer and
          a designer means I can take a project from first sketch to deployed
          site. Outside of work, I get creative with photography and video
          editing, and I unwind with my aquarium and plants.
        </h1>
        <h1 className="block md:hidden mx-5 my-5 text-2xl w-90">
          Developer and designer building full-stack web apps from first sketch
          to deployed site, using Next.js, TypeScript, and Supabase.
        </h1>
        <a
          href="/resume.pdf"
          className="rounded mx-5 md:mx-0 z-100 my-5 inline-block hover:bg-orange-700 p-3  md:p-4 bg-orange-500 text-sm md:text-xl"
          download="AbishekPariyar-Resume.pdf"
        >
          Download resume
        </a>
      </div>
    </div>
  );
}
