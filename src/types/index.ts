export interface Translation {
  id: string;
  x: number;
  y: number;
  englishText: string;
  maxWidth?: number;
  fontSize?: number;
}

export interface ManualPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  title: string;
  translations?: Translation[];
}
