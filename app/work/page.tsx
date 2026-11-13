import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { cacheLife, cacheTag } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";

async function getProjects() {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const { data, error } = await supabasePublic
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export default async function Project() {
  let projects;

  try {
    projects = await getProjects();
  } catch (e) {
    console.error("Error fetching projects:", e);
    return <p>Unable to load projects.</p>;
  }

  return (
    <div className="mx-5 md:mx-10">
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center md:text-6xl text-orange-500 p-2 md:p-5">
          Projects
        </h1>
        <p className="text-center mb-5">
          Things I’ve built, from first sketch to deployed site.
        </p>
      </div>

      <div className="flex md:*:w-120 flex-wrap gap-0">
        {projects.map((pro) => (
          <div
            className="py-5 md:p-5 flex flex-wrap justify-between"
            key={pro.id}
          >
            <div className="border overflow-hidden bg-neutral-100 rounded-lg border-neutral-200">
              <div className="w-87 md:w-full">
                {pro.thumbnail_url && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pro.live_url ?? "#"}
                  >
                    <Image
                      className="my-5 -z-10 md:my-0 md:gap-5 hover:brightness-75 transition duration-300 h-auto w-full"
                      src={pro.thumbnail_url}
                      alt={pro.title}
                      height={200}
                      width={200}
                    />
                  </a>
                )}

                <div className="p-5 z-10">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pro.live_url ?? "#"}
                    className="font-bold flex text-2xl"
                  >
                    {pro.title} <FiArrowUpRight size={15} />
                  </a>

                  <p className="w-80 md:w-100">
                    {pro.description}{" "}
                    {pro.github_url && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={pro.github_url}
                        className="italic text-sm text-blue-700"
                      >
                        View Code
                      </a>
                    )}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {pro.technologies?.map((stk: string) => (
                      <div className="gap-2" key={stk}>
                        <div className="text-xs p-1 border rounded">
                          {stk}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <p className="rounded px-5 py-2 text-center mt-10 bg-neutral-300 w-40">
          Thank you!
        </p>
      </div>
    </div>
  );
}