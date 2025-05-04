import { FC } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const blockSize = (screenWidth - 48) / 2;

const BitCoinBlock: FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        key={`bitCoinBlock`}
        alt={"bitcoinImage"}
        source={require("@/assets/images/iconx64.png")}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: blockSize,
    height: blockSize,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default BitCoinBlock;
