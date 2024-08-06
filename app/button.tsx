"use client";

import revalidateAction from "@/app/action";
import { usePathname } from "next/navigation";

export function RevalButton({ tag }: { tag: string }) {
  const pathname = usePathname();
  return (
    <button
      className=" p-1 hover:bg-slate-200 rounded-full border-purple-900 border-2 text-xs"
      onClick={() => {
        revalidateAction(tag);
      }}
    >
      revalidate ({tag})
    </button>
  );
}
