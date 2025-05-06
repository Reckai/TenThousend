import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
interface KeypadProps {
  onDigitPress: (digit: number) => void;
  onBackspacePress: () => void;
  buttonSize?: number;
  gap?: number;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigitPress,
  onBackspacePress,
  buttonSize = 65,
  gap = 15,
}) => {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const keypadWidth = buttonSize * 3 + gap * 2;

  return (
    <View style={[styles.keypadContainer, { width: keypadWidth, gap: gap }]}>
      {digits.map((digit) => (
        <TouchableOpacity
          key={digit}
          style={[
            styles.keypadButton,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
          ]}
          onPress={() => onDigitPress(digit)}
          accessibilityLabel={`Цифра ${digit}`}
          activeOpacity={0.7}
        >
          <Text style={styles.digitText}>{digit}</Text>
        </TouchableOpacity>
      ))}

      <View
        style={[styles.placeholder, { width: buttonSize, height: buttonSize }]}
      />

      <TouchableOpacity
        key={0}
        style={[
          styles.keypadButton,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
        ]}
        onPress={() => onDigitPress(0)}
        accessibilityLabel="Цифра 0"
        activeOpacity={0.7}
      >
        <Text style={styles.digitText}>0</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.keypadButton,
          styles.backspaceButton,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
        ]}
        onPress={onBackspacePress}
        accessibilityLabel="Назад"
        activeOpacity={0.7}
      >
        <Ionicons name="backspace-outline" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  keypadButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  digitText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  backspaceButton: {
    backgroundColor: Colors.orange,
    borderColor: "#ffcccc",
  },
  backspaceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Keypad;
