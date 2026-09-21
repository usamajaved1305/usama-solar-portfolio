"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type PopoverProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
  /** Wider still, for a programme drawing or a table. */
  xwide?: boolean;
};

// Native <dialog>: Escape and the backdrop close it, and focus is trapped for keyboard users.
export function Popover({ open, onClose, title, children, wide, xwide }: PopoverProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto max-h-[92vh]"
      style={{
        maxWidth: xwide ? "min(1160px, 96vw)" : wide ? "min(980px, 94vw)" : "min(720px, 94vw)",
        width: "100%",
      }}
      aria-label={title}
    >
      <div className="card p-4 sm:p-5" style={{ background: "var(--bg-card)" }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="font-bold text-[16px] leading-snug">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
