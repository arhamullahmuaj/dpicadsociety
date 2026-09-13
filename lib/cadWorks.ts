export type CadWork = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  software: string[] | null;
  member_id: string | null;
  member_name: string | null;
  source_url: string | null;
  created_at: string;
};

/** Offered in the admin form; the gallery shows whichever ones are in use. */
export const WORK_CATEGORIES = [
  "Mechanical",
  "Civil",
  "Architecture",
  "Interior Design",
  "Electrical",
  "Electronics",
  "Automobile",
  "Product Design",
  "Simulation",
  "Rendering",
  "Other",
];

export const WORK_COLUMNS =
  "id, slug, title, description, image_url, category, software, member_id, member_name, source_url, created_at";

/**
 * Raised when the cad_works table has not been created yet: PostgREST reports
 * PGRST205 for a table missing from its schema cache, Postgres itself 42P01.
 */
const MISSING_TABLE_CODES = ["PGRST205", "42P01"];

export function isMissingTable(error: { code?: string | null } | null | undefined) {
  return Boolean(error?.code && MISSING_TABLE_CODES.includes(error.code));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function formatWorkDate(value: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
