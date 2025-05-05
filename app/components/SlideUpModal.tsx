import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../utils/colors";

const { height } = Dimensions.get("window");

interface SlideUpModalProps {
  visible: boolean;
  onClose: () => void;
  height?: number;
  children: React.ReactNode;
}

const SlideUpModal: React.FC<SlideUpModalProps> = ({
  visible,
  onClose,
  height: modalHeight = height * 0.8,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const closeModal = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={closeModal}
      accessible={true}
      accessibilityViewIsModal={true}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={closeModal}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
          accessibilityHint="Closes the modal window"
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  maxHeight: modalHeight,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
              accessible={true}
              accessibilityRole="none"
              importantForAccessibility="yes"
              accessibilityLiveRegion="polite"
            >
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.modalInner} importantForAccessibility="yes">
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalInner: {
    padding: 20,
  },
});

export default SlideUpModal;
