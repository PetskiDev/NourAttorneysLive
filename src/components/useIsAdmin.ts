"use client";

import { useEffect, useState } from "react";

export function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const check = () => {
      const has = typeof document !== "undefined" && document.cookie.includes("admin=1");
      setIsAdmin(Boolean(has));
    };
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  return isAdmin;
}


