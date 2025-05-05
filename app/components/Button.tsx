import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/colors";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  backgroundColor?: string;
  onPress: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

const Button: FC<ButtonProps> = ({
  title,
  backgroundColor,
  onPress,
  style,
  accessibilityLabel,
  ...rest
}) => {
  const textColor = backgroundColor ? Colors.white : Colors.orange;
  const buttonBackgroundColor = backgroundColor || "transparent";

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.button, { backgroundColor: buttonBackgroundColor }, style]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: rest.disabled }}
      importantForAccessibility="yes"
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.orange,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
