import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { createClient } from "@/lib/supabase/server";

export default async function Project() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return <p>Unable to load projects.</p>;
  }

  return (
    <div className="mx-5 md:mx-40">
      <div className="mt-30">
        <h1 className="border-b font-bold text-3xl md:text-3xl text-orange-500 p-2 md:p-5 border-neutral-400">
          {"//"} Featured Projects
        </h1>
      </div>

      <div>
        {projects.slice(0, 4).map((pro) => (
          <div
            className="border-b py-5 md:p-5 flex flex-col-reverse md:flex-row justify-between border-neutral-300"
            key={pro.id}
          >
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={pro.live_url ?? "#"}
                className="font-bold flex text-2xl"
              >
                {pro.title} <FiArrowUpRight size={15} />
              </a>

              <p className="w-90 md:w-100">
                {pro.description}{" "}
                {pro.live_url && (
                  <a
                    href={pro.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italic text-sm text-blue-700"
                  >
                    Visit Live /
                  </a>
                )}
                {pro.github_url && (
                  <a
                    href={pro.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italic text-sm text-blue-700"
                  >
                    / View Code
                  </a>
                )}
              </p>

              <div className="flex gap-2 mt-2">
                {pro.technologies?.map((stk: string) => (
                  <div className="gap-2" key={stk}>
                    <div className="text-xs p-1 border rounded">{stk}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {pro.thumbnail_url && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={pro.live_url ?? "#"}
                >
                  <Image
                    className="my-5 md:my-0 md:gap-5 shadow-sm h-auto w-full border border-neutral-300 rounded-lg md:min-w-90"
                    src={pro.thumbnail_url}
                    alt={pro.title}
                    height={200}
                    width={200}
                  />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
