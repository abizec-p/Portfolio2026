"use client";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagramSquare,
  FaArrowUp,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <div className="h-full border-b border-neutral-300 py-10 bg-neutral-100 mt-10 flex flex-col pl-5 md:pl-0 md:flex-row gap-10 md:gap-60 justify-center  pt-10  ">
        <div className=" translate-0 md:-translate-x-25">
          <h1 className="font-bold pb-2">Abishek Pariyar</h1>
          <p className="w-90 md:w-70">
            Junior front-end developer open to roles across the GTA. Let’s build
            something great together.
          </p>
          <h1 className="flex mt-3 text-neutral-400 items-center  ">
            <span className="text-green-500 animate-pulse pr-2">
              <GoDotFill />
            </span>{" "}
            Open for opportunities
          </h1>
        </div>
        <div className="flex flex-col translate-0  md:-translate-x-25">
          <h1 className="font-bold">Quick Links</h1>
          <Link className="py-2" href="/">
            Home
          </Link>
          <Link className="py-2" href="#project">
            Works
          </Link>
          <Link className="py-2" href="/about">
            About
          </Link>
          <Link className="py-2" href="/blog">
            Blog
          </Link>
          <Link className="py-2" href="/contact">
            Contact
          </Link>
        </div>
        <div>
          <h1 className="font-bold">I am Social</h1>
          <div className="flex flex-col *:gap-2 mt-3 pt-3 md:pt-0 gap-3 *:text-neutral-600 *:hover:text-black ">
            <Link
              className="transition flex items-center hover:text-orange-500"
              href="https://github.com/abizec-p"
            >
              <FaGithub size={20} />
              <h1>Github</h1>
            </Link>
            <Link
              className=" text-black-500 flex items-center hover:text-black"
              href="https://linkedin.com/in/abishek-pariyar"
            >
              <FaLinkedin size={20} />
              <h1>Linkedin</h1>
            </Link>
            <Link
              className="hover:text-neutral-100 flex items-center"
              href="mailto:abijakepariyar@gmail.com"
            >
              <MdEmail size={20} />
              <h1>Email</h1>
            </Link>
            <Link
              className="hover:text-neutral-100 flex items-center"
              href="https://instagram.com/pariyar_abizake"
            >
              <FaInstagramSquare size={20} />
              <h1>Instagram</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-around bg-neutral-100 ">
        <p className="text-center py-5 bg-neutral-100 text-sm text-neutral-500">
          © 2026 Abishek Pariyar. All rights reserved.
        </p>
        <p className=" flex items-center gap-2 text-center py-5 bg-neutral-100 text-sm text-neutral-500">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-neutral-400 md:block hidden transition hover:text-orange-400"
          >
            ↑ Back to top
          </button>
        </p>
      </div>
    </>
  );
}
