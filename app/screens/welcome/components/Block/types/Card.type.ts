type ImageSource = number | { uri: string };

export interface CardItem {
  label: string;
  images: ImageSource[];
}
