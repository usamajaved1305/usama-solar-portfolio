// Marks this build as a local preview so it is never mistaken for the live site.
export function DemoBadge() {
  return (
    <div
      className="print-hidden fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-[12.5px] font-semibold shadow-lg"
      style={{ background: "#10161a", color: "#f2a93b", border: "1px solid #2e3e45" }}
    >
      Demo preview, not the live site
    </div>
  );
}
