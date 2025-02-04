interface WriteReportProps {
  rowNumber: number;
  keyword: {
    index: number;
    keyword?: string;
    link?: string | null;
    page?: number | null;
    position?: number | null;
  };
}

export type { WriteReportProps };
