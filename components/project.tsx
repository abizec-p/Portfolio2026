import Image from "next/image";
import { projects } from "@/data/project";
import { FiArrowUpRight } from "react-icons/fi";


export default function Project() {
  return (
    <>
      <div className=" mx-5 md:mx-40 ">
        <div className="mt-30">
          <h1 className="border-b font-bold text-3xl md:text-3xl text-orange-500 p-2 md:p-5 border-neutral-400">
           {'//'} Featured Projects
          </h1>
        </div>
        <div >
          {projects.map((pro, index) => (
            <div className="border-b py-5 md:p-5 flex flex-col-reverse md:flex-row   justify-between border-neutral-300" key={index}>
              <div >
                <div>
                <a target="_blank" href={pro.live} className="font-bold flex text-2xl">{pro.title} <FiArrowUpRight size={15} /></a>
                </div>
                <p className=" w-90 md:w-100">{pro.description} <a href={pro.github} className="italic text-sm text-blue-700">View Code</a></p>
                
                <div className="flex gap-2 mt-2 ">
                  {pro.stack.map((stk, index) => (
                    <div className="gap-2" key={index}>
                      <div className=" text-xs p-1  border rounded">{stk}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <a target="_blank" href={pro.live}>
                <Image  className="my-5 md:my-0 md:gap-5 shadow-xl h-auto w-full border border-black rounded-lg" src={pro.image} alt={pro.title} height={200} width={200}/></a>
              </div>
            </div>
          ))}
        </div>
     
      </div>
    </>
  );
}
