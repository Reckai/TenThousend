import { useEffect, useState } from "react";
import Blocks from "../../data/Blocks";
import { CardItem } from "../Block/types/Card.type";

import { router } from "expo-router";
import { Dimensions } from "react-native";

export const useBlocks = () => {
  const [cards, setCards] = useState<CardItem[]>([]);

  const loadCards = async () => {
    setCards(Blocks);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 48) / 2;

  const handleCardPress = (id: string) => {
    console.log(`Карточка ${id} нажата`);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };
  return {
    functions: {
      handleCardPress,
      handleLogin,
      handleRegister,
      loadCards,
    },
    data: {
      cards,
      cardWidth,
    },
  };
};
