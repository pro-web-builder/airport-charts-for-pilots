"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const AirportMapInner = dynamic(
  () => import("./AirportMapInner").then((mod) => mod.AirportMapInner),
  {
    ssr: false,
    loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
  }
);

export { AirportMapInner as AirportMap };
