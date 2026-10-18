import Image from "next/image";
import { timeline } from "@/data/experience";
import { GoDotFill } from "react-icons/go";

import { MdDownload } from "react-icons/md";
export default function About() {
  return (
    <div className="h-full my-10  ">
      <div className=" mt-10 md:mt-20 relative   flex flex-col items-center justify-center">
        <Image
          src="/dp.jpeg"
          height={10000}
          width={15500}
          className="w-90 md:w-180 h-auto rounded-xl opacity-70"
          alt="image"
        />
        <h1 className="absolute bottom-10 md:bottom-20 text-orange-400 animate-pulse text-3xl md:text-6xl text-shadow-lg  font-bold ">
          -about me-
        </h1>
      </div>
      <div className="mt-5 md:mt-20 gap-30 mx-5 md:mx-30  flex flex-col md:flex-row items-center">
        <div>
          <h1 className="font-bold text-orange-400  text-5xl py-5">
            Hello there
          </h1>
          <p className="  text-lg ">
            {" "}
            <b>
              I’m Abishek Pariyar, a front-end developer based in Mississauga,
              Ontario, focused on building fast, responsive, well-structured web
              applications.
            </b>{" "}
            <br />
            My path here wasn’t linear. I started learning web development at
            19, and along the way earned a diploma in advertising and graphic
            design and another in computer engineering. That combination turned
            out to be an asset rather than a detour: I bring a designer’s eye
            for clean, usable interfaces and an engineer’s focus on how things
            actually work.
            <br />
          </p>
          <div className="flex h-10 w-full justify-start   gap-5 mt-5 items-center ">
            <a
              href="/contact"
              className=" py-2 px-5 flex rounded bg-orange-400 text-white font-bold"
            >
              Contact Me
            </a>
            <a
              download="AbishekPariyar-Resume.pdf"
              href="/resume.pdf"
              className=" py-2 px-5 flex border rounded  items-center  text-black font-bold"
            >
              Resume <MdDownload size={23} className="pl-2" />
            </a>
          </div>{" "}
        </div>
        <div>
          <div className=" w-[90%] mx-5 md:mx-0 md:h-100 md:w-100 md:w-150 border border-neutral-200 rounded-lg">
            <div className="flex justify-between bg-neutral-400 text-xl text-neutral-100 px-5 py-4 border-b rounded-t-lg  border-neutral-200">
              <h1 className="font-bold ">Skills </h1>
              <h1 className="font-bold">{"//"}</h1>
            </div>
            <div className=" *:border-b flex w-90 md:w-full bg-white flex-col *:flex *:justify-between  md:gap-0   *:p-3 md:*:p-5 [&_h1]:font-bold md:[&_h1]:font-bold [&_h1]:text-xs  md:[&_h1]:text-lg h-full   text-xs md:text-lg  [&_p]:font-light md:[&_p]:font-extralight">
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
        </div>
      </div>
      <div className="mt-30   relative flex md:flex-row flex-col">
      <div className=" mx-5  md:mx-30 flex relative">
        <div className="h-335 md:h-250 flex flex-col justify-around w-0  absolute top-5 left-3 md:left-35 bg-neutral-700 ">
          <h1 className="animate-pulse">2026</h1>
          <h1>2025</h1>
          <h1>2023</h1>
          <h1>2022</h1>
          <h1>2020</h1>
        </div>
        <div className="h-335 md:h-250 flex flex-col justify-around w-1 absolute top-5 left-15 md:left-55 bg-linear-to-b from-orange-500 to-green-500 ">
  
          <GoDotFill size={25} className="-translate-x-2.5" />
          <GoDotFill size={25} className="-translate-x-2.5" />
          <GoDotFill size={25} className="-translate-x-2.5" />
          <GoDotFill size={25} className="-translate-x-2.5" />
          <GoDotFill size={25} className="-translate-x-2.5" />
        </div>

        <div className=" ml-10 md:ml-50  *:w-60 md:*:w-100   my-5  *:border flex-col gap-10 flex  pl-15  border-neutral-900  *:rounded-lg">
          {timeline.map((data, index) => (
            <div className="p-5 " key={index}>
              <div className="flex   items-center gap-2 italic text-sm text-neutral-600">
                {" "}
                <data.icon />
                <h1>{data.college}</h1>
              </div>
              <div className="">
                <h1 className="font-bold ">{data.title}</h1>
                <p className="font-extralight text-xs">{data.date}</p>
              </div>

              <p className="text-neutral-700 text-[15px]"> {data.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Image
        className="h-100 md:h-150 w-auto top-20 sticky"
        src="/abt.png"
        alt="about-image"
        height={5000}
        width={5000}/>


      </div>
      </div>
    </div>
  );
}
