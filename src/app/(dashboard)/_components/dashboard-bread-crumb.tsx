"use client";

import { usePathname } from "next/navigation";

export default function DashboardBreadCrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);
  console.log(paths);

  return <div></div>;
}
