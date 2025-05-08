import React, { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BitcoinBlock from "../BitcoinBlock/BitcoinBlock";
import Block from "../Block/Block";
import { CardItem } from "../Block/types/Card.type";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2;

interface BlockListProps {
  cards: CardItem[];
  handleCardPress: (id: string) => void;
}

const BlockList: FC<BlockListProps> = ({ cards, handleCardPress }) => {
  if (cards.length === 0) return null;

  const leftColumnCards: CardItem[] = [];
  const rightColumnCards: CardItem[] = [];

  cards.forEach((card, index) => {
    if (index % 2 === 0) {
      rightColumnCards.push(card);
    } else {
      leftColumnCards.push(card);
    }
  });

  return (
    <View style={styles.columnsContainer}>
      <View style={styles.column}>
        <BitcoinBlock />
        {leftColumnCards.map((item, index) => (
          <React.Fragment key={item.label}>
            <Block
              id={item.id}
              onPress={() => handleCardPress(item.label)}
              images={item.images}
              label={item.label}
            />
            {index < leftColumnCards.length - 1 && (
              <View style={styles.cardGap} />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.column}>
        {rightColumnCards.length > 0 && (
          <View style={{ height: cardWidth / 2 }} />
        )}

        {rightColumnCards.map((item, index) => (
          <React.Fragment key={item.label}>
            <Block
              id={item.id}
              onPress={() => handleCardPress(item.label)}
              images={item.images}
              label={item.label}
            />
            {index < rightColumnCards.length - 1 && (
              <View style={styles.cardGap} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  cardGap: {
    height: 16,
  },
});

export default BlockList;
