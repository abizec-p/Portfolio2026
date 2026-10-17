import About from "@/app/about/page";
import Project from "@/components/project";
import Skills from "@/components/skills";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Contact from "./contact/page";

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <div className="block md:flex md:items-center gap-50 border-b border-neutral-200 pb-3  w-[86%] mt-5 md:mt-20 justify-around ">
          <div>
            <h1>
              <b>Web developer & graphic designer</b> · Mississauga, ON
            </h1>
          </div>
          <div className="flex pt-3 md:pt-0 gap-10 *:text-neutral-600 *:hover:text-black ">
            <Link
              className="transition hover:text-orange-500"
              href="https://github.com/abizec-p"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              className=" text-black-500 hover:text-black"
              href="https://linkedin.com/in/abishek-pariyar"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              className="hover:text-neutral-100"
              href="mailto:abijakepariyar@gmail.com"
            >
              <MdEmail size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 md:mt-10 justify-center">
        <h1 className="font-bold text-left pl-0 md:pl-0 md:text-center w-[90%] md:w-220 text-5xl md:text-5xl">
          From scratch to the final product, I love building{" "}
          <span className="text-orange-500">web experiences</span> that work and
          look great.
        </h1>
        <p className="mt-5  w-[90%] md:w-220 text-left md:text-center">
          I’m a junior full-stack developer who builds responsive web apps with
          Next.js, TypeScript and Supabase. I’m currently looking for my first
          full-time role in the GTA, and I’d love to build something great with
          your team.
        </p>
      </div>
      <div className="flex px-5 h-10 w-full justify-start  md:justify-center gap-5 mt-10 items-center ">
        <button className=" py-2 px-5 flex rounded bg-orange-400 text-white font-bold">
          Contact Me
        </button>
        <button className=" py-2 px-5 flex border rounded  items-center  text-black font-bold">
          Resume <MdDownload size={23} className="pl-2" />
        </button>
      </div>
      <div className=" hidden md:block md:absolute bottom-8 md:bottom-25 left-1/2 -translate-x-1/2">
        <MdKeyboardArrowDown size={32} className="animate-bounce" />
      </div>
      <Project  />
      <Skills />
      <div className="flex mt-40 border-b border-double border-neutral-300 p-10 mx-20 flex-col items-center">
        <h1 className="text-2xl w-90 md:text-5xl md:w-200 font-bold">
          Open to Junior{" "}
          <span className="text-orange-500"> Web Developer </span> & Graphic
          Design roles.
        </h1>
        <p className="text-sm ml-20  w-70">
          Detail-oriented, fast learner, and happiest when turning an idea into
          a working product. If that sounds like your team, let’s talk.
        </p>

        <Link
          href="/contact"
          className=" mt-10 px-5 py-3 transition ease-in-out duration-300 hover:text-white hover:border-white hover:bg-orange-400 font-bold bg-white rounded border border-black"
        >
          {" "}
          Contact Me
        </Link>
      </div>
      <div id="contact">
      <Contact />
      </div>
    
    </>
  );
}
