import { ASSETS } from "@/app/utils/assets";
import { CommonStyles } from "@/app/utils/styles";
import { FC } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const blockSize = (screenWidth - 48) / 2;

const BitCoinBlock: FC = () => {
  return (
    <View style={[styles.container, CommonStyles.marginBottom]}>
      <Image
        style={styles.image}
        key={`bitCoinBlock`}
        alt={"bitcoinImage"}
        source={ASSETS.BTC_ICON}
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default BitCoinBlock;
