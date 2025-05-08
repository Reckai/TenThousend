import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/colors";
import { CommonStyles } from "../utils/styles";

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
      style={[
        CommonStyles.button,
        CommonStyles.centerContent,
        { backgroundColor: buttonBackgroundColor, width: "90%" },
        style,
      ]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: rest.disabled }}
      importantForAccessibility="yes"
    >
      <Text style={[CommonStyles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Custom styles specific to this component that aren't in CommonStyles
});

export default Button;
