import Image from "next/image";
export default function About() {
  return (
    <div className="h-100">
      <div className="mt-30 flex flex-col items-center justify-center">
        <Image src="/newabt.jpeg" height={10000} width={15500} className="w-180 h-auto rounded-xl opacity-70"  alt="image" />
        <h1 className="absolute text-orange-400 text-6xl text-shadow-lg  font-bold ">-about me-</h1>
      </div>
    </div>
  );
}
