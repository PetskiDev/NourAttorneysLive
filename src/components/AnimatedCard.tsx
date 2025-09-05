"use client";

import type { ReactNode } from "react";

export default function AnimatedCard({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
