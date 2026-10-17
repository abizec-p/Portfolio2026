import Project from "@/components/project";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";


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
            <Link className="transition hover:text-orange-500" href="/">
              <FaGithub size={20} />
            </Link>
            <Link className=" text-black-500 hover:text-black" href="/">
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
        <h1 className="font-bold text-left pl-5 md:pl-0 md:text-center w-220 text-5xl md:text-5xl">
          From scratch to the final product, I love building{" "}
          <span className="text-orange-500">web experiences</span> that work and
          look great.
        </h1>
        <p className="mt-5 w-210 text-center">I’m a junior full-stack developer who builds responsive web apps with Next.js, TypeScript and Supabase. I’m currently looking for my first full-time role in the GTA, and I’d love to build something great with your team.</p>
      </div>
      <div className="flex h-10 w-full justify-center gap-5 mt-10 items-center ">
        <button className=" py-2 px-5 flex rounded bg-orange-400 text-white font-bold">
          Contact Me
        </button>
        <button className=" py-2 px-5 flex border rounded  items-center  text-black font-bold">
          Resume <MdDownload size={23} className="pl-2" />
        </button>
      </div>
      <div className="absolute bottom-8 md:bottom-25 left-1/2 -translate-x-1/2">
  <MdKeyboardArrowDown size={32} className="animate-bounce" />
</div>
<Project/>
    </>
  );
}
