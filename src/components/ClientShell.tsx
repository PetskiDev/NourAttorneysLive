"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavBar from "~/components/NavBar";
import SmoothScrollProvider from "~/components/SmoothScrollProvider";
import RevealController from "./RevealController";
import LineRevealer from "~/components/LineRevealer";
import FontScaler from "./FontScaler";


type Mode = "light" | "dark";

const WHITE_NAVBAR = [  "/insights", "/people", "/partners"];
const BLUE_NAVBAR = ["/expertise", "/about-us", "/frameworks", "/contact"];

function pickMode(pathname: string): Mode {
  if (pathname === "/") return "light";
  if (WHITE_NAVBAR.some((p) => pathname.startsWith(p))) return "dark";
  if (BLUE_NAVBAR.some((p) => pathname.startsWith(p))) return "light";
  return "light";
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [mode, setMode] = useState<Mode>(() => pickMode(pathname));

  useEffect(() => {
    setMode(pickMode(pathname));
  }, [pathname]);

  // Keep header outside transform layer to avoid blurring and sticky glitches
  return (
    <SmoothScrollProvider headerOffset={0}>
      <RevealController/>
      <LineRevealer/>
      <FontScaler/>
      <NavBar key={pathname} mode={mode} />
      {children}
    </SmoothScrollProvider>
  );
}


