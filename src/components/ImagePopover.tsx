"use client";

import { useState } from "react";
import { Popover } from "./Popover";

type Props = {
  src: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  verify?: string;
};

export function ImagePopover({ src, title, children, className, verify }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <Popover open={open} onClose={() => setOpen(false)} title={title} wide>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export serves these unoptimised; sizes are unknown at build time */}
        <img
          src={src}
          alt={title}
          className="w-full h-auto max-h-[72vh] object-contain rounded-xl"
          style={{ background: "#ffffff" }}
        />
        <div className="mt-3 flex flex-wrap gap-4 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
          <a href={src} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Open full size
          </a>
          {verify && (
            <a href={verify} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Verify this certificate
            </a>
          )}
        </div>
      </Popover>
    </>
  );
}
