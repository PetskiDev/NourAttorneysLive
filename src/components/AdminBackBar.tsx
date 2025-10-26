"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "~/app/admin/admin.module.css";

export default function AdminBackBar() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/admin")) return null;
  if (pathname === "/admin" || pathname === "/admin/login") return null;

  return (
    <div style={{ position: "fixed", top: 110, right: 100, zIndex: 1000 }}>
      <Link href="/admin">
        <button type="button" className={s.btn}>Back to dashboard</button>
      </Link>
    </div>
  );
}


