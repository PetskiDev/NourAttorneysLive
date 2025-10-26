import type { ReactNode } from "react";
import AdminBackBar from "~/components/AdminBackBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminBackBar />
      {children}
    </>
  );
}


