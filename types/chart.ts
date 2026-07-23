import type { ChartCategoryValue } from "@/lib/utils/constants";

export type ChartSummary = {
  id: string;
  category: ChartCategoryValue;
  title: string;
  identifier: string | null;
  fileUrl: string;
  revisionDate: string | null;
  isPlaceholder: boolean;
};
