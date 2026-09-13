import { supabase } from "@/lib/supabase";

type PageProps = { params: Promise<{ memberId: string }> };

type Member = {
  Member_id: string;
  Full_name: string;
  Profile_photo: string | null;
  Department: string | null;
  Semester: string | number | null;
  Session: string | null;
  Position: string | null;
  Membership_type: string | null;
  Join_date: string | null;
  Status: string | null;
  Bio: string | null;
};

const detailLabels: Array<[keyof Pick<Member, "Department" | "Semester" | "Session" | "Position" | "Membership_type" | "Join_date">, string]> = [
  ["Department", "Department"],
  ["Semester", "Semester"],
  ["Session", "Academic Session"],
  ["Position", "Society Position"],
  ["Membership_type", "Membership Type"],
  ["Join_date", "Joined On"],
];

export default async function MemberProfile({ params }: PageProps) {
  const { memberId } = await params;
  const { data, error } = await supabase
    .from("public_members")
    .select("*")
    .eq("Member_id", memberId)
    .maybeSingle();
  const member = data as Member | null;

  if (error) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center text-red-400">Unable to verify this member: {error.message}</main>;
  }

  if (!member) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">CAD Society</p>
          <h1 className="mt-4 text-3xl font-semibold">Member Not Found</h1>
          <p className="mt-3 text-zinc-400">No verified member exists with ID {memberId}.</p>
        </div>
      </main>
    );
  }

  const isActive = member.Status?.toLowerCase() === "active";

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">CAD Society</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Member Verification</h1>
          </div>
          <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
            <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-amber-400"}`} />
            {member.Status ?? "Status unavailable"}
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {member.Profile_photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={`${member.Full_name} profile photo`} className="h-28 w-28 rounded-2xl border border-zinc-700 object-cover" src={member.Profile_photo} />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950 text-4xl font-semibold text-zinc-400">
                  {member.Full_name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Verified member</p>
                <h2 className="mt-2 text-3xl font-semibold">{member.Full_name}</h2>
                <p className="mt-2 font-mono text-sm text-zinc-400">{member.Member_id}</p>
                {member.Position && <p className="mt-4 text-sm text-zinc-300">{member.Position}</p>}
              </div>
            </div>
          </div>

          <div className="grid divide-y divide-zinc-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {detailLabels.map(([key, label]) => (
              <div className="p-6" key={key}>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                <p className="mt-2 text-base text-zinc-100">{member[key] || "Not provided"}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">About the member</p>
            <p className="mt-3 max-w-2xl leading-7 text-zinc-300">{member.Bio || "No member biography has been provided."}</p>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/20 px-5 py-4 text-sm text-emerald-300">
          This profile is issued by CAD Society&apos;s digital member verification system.
        </div>
        <footer className="mt-8 text-center text-xs text-zinc-600">
          <p>CAD Society · Digital Member Verification</p>
          <p className="mt-2 text-zinc-700">Designed &amp; Developed by Arhamullah Muaj &amp; Zawad Zarir</p>
        </footer>
      </div>
    </main>
  );
}
