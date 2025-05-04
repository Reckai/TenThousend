import { FC } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CardItem } from "./types/Card.type";

const screenWidth = Dimensions.get("window").width;
const blockSize = (screenWidth - 48) / 2;

interface BlockProps extends CardItem {
  onPress?: (event: GestureResponderEvent) => void;
}

const Block: FC<BlockProps> = ({ images, label }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, index === 1 && styles.middleImage]}
            alt={`image:${image}`}
          />
        ))}
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: blockSize,
    height: blockSize,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: blockSize * 0.4,
    gap: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: -8,
  },
  middleImage: {
    position: "absolute",
    zIndex: 2,
    transform: [{ scale: 1.2 }],
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Block;
