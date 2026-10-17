import Link from "next/link";
export default function Nav() {
  return (
    <>
    <div className="flex gap-30 md:gap-200 h-15 bg-white  border-b-1 border-[#ebebeb] p-2 md:p-5 justify-around"> 
    <div>
      <h1 className="hidden md:block font-bold text-xl"><a href="/">Abishek pariyar</a></h1>
      <h1 className="md:hidden font-bold text-xl">AP.</h1>

    </div>
    <div className="flex gap-5 justify-around"> 
        <Link href="#project">works</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
        
    </div>
    </div>
    </>
  );
}
