export interface ImageEntry {
  id: number;
  documentId: string;
  alternativeText: string;
  name: string;
  url: string;
  formats: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
    small: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  year: number;
  description: string;
  mainImage?: ImageEntry;
  sliderImages?: ImageEntry[];
  createdAt: Date;
  updatedAt: Date;
}
