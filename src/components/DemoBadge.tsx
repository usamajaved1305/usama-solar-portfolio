// Marks this build as a local preview so it is never mistaken for the live site.
// Desktop: a small pill in the corner. Phone: a plain line at the end of the page, so it never covers a button.
export function DemoBadge() {
  const style = { background: "#10161a", color: "#f2a93b", border: "1px solid #2e3e45" };
  return (
    <>
      <div
        className="print-hidden pointer-events-none fixed bottom-4 right-4 z-50 hidden whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-semibold shadow-lg lg:block"
        style={style}
      >
        Demo preview, not the live site
      </div>
      <div className="print-hidden px-4 py-3 text-center text-[12.5px] font-semibold lg:hidden" style={{ ...style, borderWidth: "1px 0 0" }}>
        Demo preview, not the live site
      </div>
    </>
  );
}
