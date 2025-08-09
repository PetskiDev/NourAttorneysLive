"use client";

import "~/styles/globals.css";
import { usePathname } from "next/navigation";
import NavBar from "~/components/NavBar";

type Mode = "light" | "dark";

const DARK_PREFIXES = ["/about-us", "/expertise", "/people"];
const LIGHT_PREFIXES = ["/frameworks", "/insights", "/contact"];

function pickMode(pathname: string): Mode {
  if (pathname === "/") return "dark";
  if (DARK_PREFIXES.some(p => pathname.startsWith(p))) return "dark";
  if (LIGHT_PREFIXES.some(p => pathname.startsWith(p))) return "light";
  return "light";
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname() || "/";
  const mode = pickMode(pathname);

  return (
    <html lang="en">
      <body>
        <NavBar mode={mode} />
        {children}
      </body>
    </html>
  );
}
