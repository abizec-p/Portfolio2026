"use client";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";


export default function Contact() {
  const [status, setStatus] = useState("");

  async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending...");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setStatus("Message Sent");
      form.reset();
    } catch (error) {
      console.log(error);

      setStatus("something went wrong. Try again.");
    }
  }

  return (
<section className="block md:flex">
        <div >
          <h1 className="text-6xl mx-5 md:mx-50  font-bold mt-20 text-orange-500">
                        <p className="text-lg  text-neutral-700 ">Lets talk,</p>

            Contact Me
                      <p className="text-lg w-80 text-neutral-700">Have a role, project, or idea in mind? Send me a message and I’ll get back to you soon.</p>

          </h1>
          <div className="border  border-neutral-300 mx-4 md:mx-50 mt-15 rounded w-90 md:w-100">
            <div className="p-5 ">
              <h1 className="flex items-center  ">
                <span className="text-green-500 animate-pulse pr-2">
                  <GoDotFill />
                </span>{" "}
                Open to work
              </h1>
              <div className="mt-5">
                <div className=" p-2 flex justify-between border-b border-neutral-300 ">
                  <h1>Email</h1> <p>abijakepariyar@gmail.com</p>
                </div>
                <div className=" p-2 flex justify-between border-b border-neutral-300 ">
                  <h1>Phone</h1> <p>+1 (437) 665-1393</p>
                </div>
                <div className=" p-2 flex justify-between border-b border-neutral-300 ">
                  <h1>Location</h1> <p>Mississauga, ON, Canada</p>
                </div>
              </div>
              <div className="flex mt-5 pt-3 md:pt-0 gap-5 *:text-neutral-600 *:hover:text-black ">
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
                <Link
                  className="hover:text-neutral-100"
                  href="https://instagram.com/pariyar_abizake"
                >
                  <FaInstagramSquare size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

    <div>
    <form
      onSubmit={sendEmail}
      className="w-90 mx-4 md:mx-0 md:w-full max-w-lg space-y-5 rounded-lg border border-neutral-300 mt-20  p-6 shadow-xl md:p-8"
    >
      <div className="space-y-2">
        <label
          htmlFor="from_name"
          className="text-sm font-medium text-neutral-300"
        >
          Your name
        </label>
        <input
          id="from_name"
          name="from_name"
          placeholder="John Doe"
          required
          className="w-full rounded border border-neutral-300 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-300 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="reply_to"
          className="text-sm font-medium text-neutral-300"
        >
          Your email
        </label>
        <input
          id="reply_to"
          name="reply_to"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full rounded border border-neutral-300 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-300 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-neutral-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          rows={5}
          required
          className="w-full resize-none rounded border border-neutral-300 px-4 py-3 text-sm leading-6 text-black placeholder:text-neutral-500 outline-none transition-all duration-300 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/10"
        />
      </div>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-700 px-5 py-3.5 font-semibold text-neutral-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 "
      >
        Send message
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

      <p
        aria-live="polite"
        className="min-h-5 text-center text-sm text-neutral-300"
      >
        {status}
      </p>
    </form>
    </div>
    </section>
  );
}
