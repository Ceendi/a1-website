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
