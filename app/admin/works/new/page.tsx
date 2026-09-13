"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { isMissingTable, WORK_CATEGORIES, slugify } from "@/lib/cadWorks";
import { supabase } from "@/lib/supabase";
import { useAdminGuard } from "@/lib/useAdminGuard";

const FIELD =
  "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400";

export default function NewWorkPage() {
  const router = useRouter();
  const { checking } = useAdminGuard();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState(WORK_CATEGORIES[0]);
  const [memberName, setMemberName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [software, setSoftware] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2 MB. Export the render at a smaller size or compress it first.");
      return;
    }

    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "The selected image could not be uploaded.");
      setUploading(false);
      return;
    }

    setImageUrl(result.url);
    setImageName(file.name);
    setUploading(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const finalSlug = slugify(slug || title);
    if (!finalSlug) {
      setError("Add a title so the work can get a web address.");
      return;
    }
    if (!imageUrl) {
      setError("Upload an image of the work first.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("cad_works")
      .insert({
        slug: finalSlug,
        title: title.trim(),
        description: description.trim() || null,
        image_url: imageUrl,
        category,
        software: software
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        member_id: memberId.trim() || null,
        member_name: memberName.trim() || null,
        source_url: sourceUrl.trim() || null,
      })
      .select();

    if (error) {
      if (error.code === "23505") {
        setError("A work with this web address already exists. Change the title or the web address and try again.");
      } else if (isMissingTable(error)) {
        setError("The cad_works table does not exist yet. Run supabase/cad_works.sql in the Supabase SQL Editor first.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setError("The work was not published. Your session may have expired — please sign in again.");
      setLoading(false);
      return;
    }

    router.push("/admin/works");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">
        Checking session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link className="text-sm text-zinc-500 transition hover:text-white" href="/admin/works">
            ← Back to CAD Works
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-500">CAD Society</p>
          <h1 className="mt-3 text-3xl font-semibold">Publish a Work</h1>
          <p className="mt-2 text-sm text-zinc-500">Add a member model, drawing or render to the public gallery.</p>
        </div>

        <form className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400" htmlFor="work-title">
                Title *
              </label>
              <input
                className={FIELD}
                id="work-title"
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="Bolted flange assembly"
                required
                type="text"
                value={title}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400" htmlFor="work-slug">
                Web address
              </label>
              <input
                className={FIELD}
                id="work-slug"
                onChange={(event) => {
                  setSlug(event.target.value);
                  setSlugEdited(true);
                }}
                placeholder="bolted-flange-assembly"
                type="text"
                value={slug}
              />
              <p className="mt-2 text-xs text-zinc-600">
                The work will be shared at /works/{slugify(slug || title) || "..."}
              </p>
            </div>

            <div>
              <label className="text-sm text-zinc-400" htmlFor="work-category">
                Category
              </label>
              <select
                className={FIELD}
                id="work-category"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                {WORK_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-400" htmlFor="work-software">
                Software used
              </label>
              <input
                className={FIELD}
                id="work-software"
                onChange={(event) => setSoftware(event.target.value)}
                placeholder="SolidWorks, KeyShot"
                type="text"
                value={software}
              />
              <p className="mt-2 text-xs text-zinc-600">Separate each one with a comma.</p>
            </div>

            <div>
              <label className="text-sm text-zinc-400" htmlFor="work-member-name">
                Member name
              </label>
              <input
                className={FIELD}
                id="work-member-name"
                onChange={(event) => setMemberName(event.target.value)}
                placeholder="Arhamullah Muaj"
                type="text"
                value={memberName}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400" htmlFor="work-member-id">
                Member ID
              </label>
              <input
                className={FIELD}
                id="work-member-id"
                onChange={(event) => setMemberId(event.target.value)}
                placeholder="CADS-26-001"
                type="text"
                value={memberId}
              />
              <p className="mt-2 text-xs text-zinc-600">Links the work to the verified member profile.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400" htmlFor="work-source">
                Model file link
              </label>
              <input
                className={FIELD}
                id="work-source"
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder="https://drive.google.com/..."
                type="url"
                value={sourceUrl}
              />
              <p className="mt-2 text-xs text-zinc-600">Optional — a Drive or GrabCAD link to the actual model file.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400" htmlFor="work-description">
                Description
              </label>
              <textarea
                className={`${FIELD} min-h-32 resize-y`}
                id="work-description"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What the model is, how it was made, and anything worth noticing in it."
                value={description}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400" htmlFor="work-image">
                Image *
              </label>
              <input
                accept="image/jpeg,image/png,image/webp"
                className={`${FIELD} file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:text-white`}
                id="work-image"
                onChange={handleImageChange}
                type="file"
              />
              <p className="mt-2 text-xs text-zinc-600">
                {uploading
                  ? "Uploading..."
                  : imageUrl
                    ? `Uploaded: ${imageName}`
                    : "JPG, PNG or WebP, up to 2 MB. A wide screenshot or render works best."}
              </p>

              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Preview of the uploaded work"
                  className="mt-4 aspect-[16/10] w-full rounded-xl border border-zinc-800 object-contain"
                  src={imageUrl}
                />
              )}
            </div>
          </div>

          {error && <p className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">{error}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading || uploading}
              type="submit"
            >
              {loading ? "Publishing..." : "Publish Work"}
            </button>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              href="/admin/works"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
