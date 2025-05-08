type ImageSource = number | { uri: string };

export interface CardItem {
  id: number;
  label: string;
  images: ImageSource[];
}
