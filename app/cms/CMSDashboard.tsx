"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Search,
  LogOut,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Globe,
  FileText,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  thumbnail_url: string | null;
  live_url: string | null;
  github_url: string | null;
  status: "published" | "draft";
  created_at: string;
};

const emptyForm = {
  title: "",
  description: "",
  category: "Web Development",
  technologies: "",
  thumbnail_url: "",
  live_url: "",
  github_url: "",
  status: "draft" as "published" | "draft",
};

function createSlug(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 7)
  );
}

export default function CMSDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Image upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Clean up temporary image previews
  useEffect(() => {
    if (!imagePreview.startsWith("blob:")) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function loadProjects() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects((data || []) as Project[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    setModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingId(project.id);

    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies?.join(", ") || "",
      thumbnail_url: project.thumbnail_url || "",
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      status: project.status,
    });

    setSelectedImage(null);
    setImagePreview(project.thumbnail_url || "");
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedImage(null);
    setImagePreview("");
    setError("");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PNG, JPG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/cms/login");
        return;
      }

      // Keep the existing image unless a new one is selected
      let thumbnailUrl = form.thumbnail_url.trim() || null;

      // Upload a new image if selected
      if (selectedImage) {
        const safeFileName = selectedImage.name.replace(/[^a-zA-Z0-9.-]/g, "-");

        const fileName = `${user.id}/${Date.now()}-${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, selectedImage, {
            cacheControl: "3600",
            contentType: selectedImage.type,
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Generate public image URL
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        thumbnailUrl = data.publicUrl;
      }

      // Prepare database data
      const payload = {
        title: form.title.trim(),
        slug: editingId
          ? projects.find((p) => p.id === editingId)?.slug ||
            createSlug(form.title)
          : createSlug(form.title),
        description: form.description.trim(),
        category: form.category,
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        thumbnail_url: thumbnailUrl,
        live_url: form.live_url.trim() || null,
        github_url: form.github_url.trim() || null,
        status: form.status,
        owner_id: user.id,
      };

      // Update existing project
      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert(payload);

        if (error) throw error;
      }

      closeModal();
      setForm(emptyForm);
      setEditingId(null);

      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadProjects();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/cms/login");
    router.refresh();
  }

  const categories = [
    "All",
    "Web Development",
    "UI/UX Design",
    "Graphic Design",
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || project.category === category;

    return matchesSearch && matchesCategory;
  });

  const published = projects.filter((p) => p.status === "published").length;

  const drafts = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-6 md:flex md:flex-col">
          <div className="text-2xl font-bold tracking-tight">
            Portfolio<span className="text-violet-600">CMS.</span>
          </div>

          <p className="mt-2 text-xs text-gray-400">CONTENT MANAGEMENT</p>

          <nav className="mt-8 space-y-2">
            <div className="flex items-center gap-3 rounded-xl bg-violet-50 px-4 py-3 font-semibold text-violet-700">
              <LayoutDashboard size={19} />
              Dashboard
            </div>

            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-500">
              <FolderKanban size={19} />
              Projects
            </div>
          </nav>

          <div className="mt-auto border-t border-gray-100 pt-5">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-9">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">Portfolio / Dashboard</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your portfolio content.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50 md:hidden"
              >
                <LogOut size={17} />
                Logout
              </button>

              <button
                onClick={openAddModal}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              icon={<FolderKanban size={21} />}
              label="Total Projects"
              value={projects.length}
            />

            <StatCard
              icon={<Globe size={21} />}
              label="Published"
              value={published}
            />

            <StatCard
              icon={<FileText size={21} />}
              label="Drafts"
              value={drafts}
            />
          </section>

          <section className="mt-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Your Projects</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create and manage your portfolio projects.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === item
                      ? "bg-violet-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </p>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-24 text-gray-400">
                <Loader2 className="mr-2 animate-spin" size={20} />
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
                <FolderKanban size={35} className="mx-auto text-gray-300" />
                <h3 className="mt-4 font-semibold">No projects found</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Add your first project to get started.
                </p>
                <button
                  onClick={openAddModal}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Add your first project
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="relative flex aspect-[16/9] items-center justify-center bg-gray-100">
                      {project.thumbnail_url ? (
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FolderKanban size={38} className="text-gray-300" />
                      )}

                      <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                        {project.category}
                      </p>

                      <h3 className="mt-2 text-lg font-bold">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => openEditModal(project)}
                            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-violet-600"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-sm text-gray-500 hover:text-violet-600"
                            >
                              <ExternalLink size={15} />
                              View
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => deleteProject(project.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${project.title}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your project details below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project title *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. TasteHome"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe your project..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                  >
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Graphic Design</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "published" | "draft",
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Technologies
                </label>
                <input
                  value={form.technologies}
                  onChange={(e) =>
                    setForm({ ...form, technologies: e.target.value })
                  }
                  placeholder="React, Next.js, TypeScript"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Separate technologies with commas.
                </p>
              </div>

              {/* Thumbnail image upload */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project thumbnail
                </label>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or WebP. Maximum 5 MB.
                </p>

                {imagePreview && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium">Image preview</p>

                    <img
                      src={imagePreview}
                      alt="Project thumbnail preview"
                      className="h-48 w-full rounded-xl border border-gray-200 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Live website URL
                  </label>
                  <input
                    type="url"
                    value={form.live_url}
                    onChange={(e) =>
                      setForm({ ...form, live_url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={form.github_url}
                    onChange={(e) =>
                      setForm({ ...form, github_url: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Project"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
          {icon}
        </div>
      </div>
      <p className="mt-5 text-3xl font-bold">{value}</p>
    </div>
  );
}
