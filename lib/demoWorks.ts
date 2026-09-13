import type { CadWork } from "@/lib/cadWorks";

/**
 * Sample gallery entries shown until the society publishes its own work.
 * As soon as one real work exists in the cad_works table these disappear.
 *
 * Member names are placeholders — replace them along with the entries.
 * Images are CC0 / public domain, see public/demo/CREDITS.md.
 */
export const DEMO_WORKS: CadWork[] = [
  {
    id: "demo-1",
    slug: "ground-floor-plan-cad-lab-block",
    title: "Ground Floor Plan — CAD Lab Block",
    description:
      "A measured drawing set for the proposed CAD lab block: ground floor plan, two sections and a door and window schedule, drawn to 1:100 on A1 sheets. The team surveyed the existing site by tape and laser, then set the whole drawing out on a 600 mm planning grid.\n\nWall build-ups are 125 mm brick with 12 mm plaster both faces, and every opening is tagged back to the schedule. The plan was checked against circulation widths before it went to the department for review.",
    image_url: "/demo/blueprint-plan.jpg",
    category: "Architecture",
    software: ["AutoCAD", "Revit"],
    member_id: null,
    member_name: "Nusrat Jahan",
    source_url: null,
    created_at: "2026-08-29T10:00:00Z",
  },
  {
    id: "demo-2",
    slug: "spur-gear-pair-20-degree-involute",
    title: "Spur Gear Pair — 20° Involute",
    description:
      "A meshing spur gear pair modelled from first principles: module 2.5, 20 and 14 teeth, 20° pressure angle, giving a 1.43:1 reduction. The tooth profile was built as a true involute curve rather than an approximation, so the contact ratio could be checked in the assembly.\n\nBoth gears carry a 12 × 5 keyway and were run through an interference check across a full revolution before the drawings were extracted.",
    image_url: "/demo/gear-detail.jpg",
    category: "Mechanical",
    software: ["SolidWorks", "Fusion 360"],
    member_id: null,
    member_name: "Rakibul Hasan",
    source_url: null,
    created_at: "2026-08-14T10:00:00Z",
  },
  {
    id: "demo-3",
    slug: "warren-truss-footbridge-12m",
    title: "Warren Truss Footbridge — 12 m Span",
    description:
      "A pedestrian footbridge over the campus drain: a Warren truss of six 2 m panels, made up from 75 × 75 × 6 MS angle with welded gusset nodes. Pinned at one end and on a roller at the other, so thermal movement is not restrained.\n\nThe frame was analysed for a 4.5 kN/m live load. Peak axial forces came out at 96 kN tension in the bottom chord and 88 kN compression in the top chord, both inside the section capacity with a comfortable margin.",
    image_url: "/demo/truss-bridge.jpg",
    category: "Civil",
    software: ["AutoCAD", "ANSYS"],
    member_id: null,
    member_name: "Sadman Sakib",
    source_url: null,
    created_at: "2026-07-31T10:00:00Z",
  },
  {
    id: "demo-4",
    slug: "gear-train-lathe-headstock",
    title: "Gear Train Layout — Lathe Headstock",
    description:
      "A reverse-engineering exercise on the workshop lathe headstock. Every gear in the train was measured with vernier and gear tooth calipers, modelled, and rebuilt as an assembly so the available speed steps could be worked out from the ratios.\n\nThe finished assembly reproduces all eight spindle speeds, and the exploded view is now used as a teaching drawing for first-year students in the machine shop.",
    image_url: "/demo/industrial-machine.jpg",
    category: "Mechanical",
    software: ["SolidWorks", "Autodesk Inventor"],
    member_id: null,
    member_name: "Mahmudul Hasan",
    source_url: null,
    created_at: "2026-07-16T10:00:00Z",
  },
  {
    id: "demo-5",
    slug: "3d-printed-sensor-bracket",
    title: "3D Printed Sensor Bracket",
    description:
      "A mounting bracket for a distance sensor on the society robotics rig, taken from sketch to printed part in one session. The part was designed around the print process: no overhang steeper than 45°, so it needs no support material, and walls sized to a whole number of 0.4 mm perimeters.\n\nPrinted in PLA at 0.2 mm layers with 40% gyroid infill. The first version snapped at the fillet, so the radius was increased from 1 mm to 3 mm and it has held since.",
    image_url: "/demo/3d-printer.jpg",
    category: "Product Design",
    software: ["Fusion 360", "Cura"],
    member_id: null,
    member_name: "Tasnim Akter",
    source_url: null,
    created_at: "2026-06-27T10:00:00Z",
  },
  {
    id: "demo-6",
    slug: "auditorium-canopy-concept",
    title: "Auditorium Canopy — Concept to Surface Model",
    description:
      "An entrance canopy study for the institute auditorium, starting as a hand sketch over a printed site plan and ending as a surface model that could be dimensioned. The curve was tied down to three control points so it stayed buildable in steel.\n\nThe final model was set out with a 1.8 m structural grid and rendered for the departmental presentation, alongside a shadow study for the afternoon sun.",
    image_url: "/demo/architectural-design.jpg",
    category: "Architecture",
    software: ["SketchUp", "AutoCAD", "Twinmotion"],
    member_id: null,
    member_name: "Arifur Rahman",
    source_url: null,
    created_at: "2026-06-09T10:00:00Z",
  },
];
