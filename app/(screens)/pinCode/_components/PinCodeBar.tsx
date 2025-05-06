import { Colors } from "@/app/utils/colors";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { PIN_CODE_LENGTH } from "../_consts";

interface PinCodeBarProps {
  pinCode: string;
}
const PinCodeBar: FC<PinCodeBarProps> = ({ pinCode = "" }) => {
  const dots = Array(PIN_CODE_LENGTH).fill(0);

  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < pinCode.length ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: Colors.orange,
  },
  inactiveDot: {
    backgroundColor: Colors.grayBlack,
  },
});

export default PinCodeBar;
