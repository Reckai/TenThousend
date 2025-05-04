import { CardItem } from "./screens/welcome/components/Block/types/Card.type";

export const generateRandomCards = (count: number): CardItem[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      label: `Карточка ${index + 1}`,
      images: [],
    };
  });
};

export class CardService {
  static getCards(count: number = 10): Promise<CardItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateRandomCards(count));
      }, 300);
    });
  }
}

export default CardService;
