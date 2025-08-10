"use client";

import { usePathname } from "next/navigation";
import NavBar from "~/components/NavBar";
import SmoothScrollProvider from "~/components/SmoothScrollProvider";

type Mode = "light" | "dark";

const WHITE_NAVBAR = ["/about-us", "/expertise", "/people"];
const BLUE_NAVBAR = ["/frameworks", "/insights", "/contact"];

function pickMode(pathname: string): Mode {
  if (pathname === "/") return "light";
  if (WHITE_NAVBAR.some((p) => pathname.startsWith(p))) return "dark";
  if (BLUE_NAVBAR.some((p) => pathname.startsWith(p))) return "light";
  return "light";
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const mode = pickMode(pathname);

  // Keep header outside transform layer to avoid blurring and sticky glitches
  return (
    <SmoothScrollProvider headerOffset={0}>
      <NavBar mode={mode} />
      {children}
    </SmoothScrollProvider>
  );
}


