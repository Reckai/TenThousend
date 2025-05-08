import { CommonStyles } from "@/app/utils/styles";
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
const blockHeight = blockSize * 0.8; // Reduced height

interface BlockProps extends CardItem {
  onPress?: (event: GestureResponderEvent) => void;
}

const Block: FC<BlockProps> = ({ images, label }) => {
  return (
    <View style={[styles.container, CommonStyles.marginBottom]}>
      <View
        style={[
          CommonStyles.flexContainer,
          CommonStyles.centerContent,
          CommonStyles.smallGap,
        ]}
      >
        <View
          style={[
            CommonStyles.flexRow,
            CommonStyles.centerContent,
            styles.rowContainer,
          ]}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={[styles.image, index === 1 && styles.middleImage]}
              alt={`image:${image}`}
            />
          ))}
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[CommonStyles.description, CommonStyles.boldText]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: blockSize,
    height: blockHeight,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContainer: {
    position: "relative",
    height: blockHeight * 0.5,
    gap: 20,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: -6,
  },
  middleImage: {
    position: "absolute",
    zIndex: 2,
    transform: [{ scale: 1.1 }],
  },
});

export default Block;
