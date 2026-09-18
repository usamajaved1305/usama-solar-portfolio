"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid h-10 w-10 place-items-center rounded-full border transition-colors cursor-pointer"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text-dim)" }}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
