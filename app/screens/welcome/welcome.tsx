import { CardService } from "@/app/cardService";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/Button";
import SlideUpModal from "../../components/SlideUpModal";
import { Colors } from "../../utils/colors";
import { CommonStyles } from "../../utils/styles";
import BitcoinBlock from "./components/BitcoinBlock/BitcoinBlock";
import Block from "./components/Block/Block";
import { CardItem } from "./components/Block/types/Card.type";

// Компонент содержимого модального окна
const RegistrationForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <Text style={styles.modalTitle}>Форма регистрации</Text>
      <TextInput placeholder="Имя" style={styles.input} />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Button
        title="Закрыть"
        onPress={onClose}
        backgroundColor={Colors.orange}
      />
      <Button
        title="Перейти к регистрации"
        onPress={() => {
          onClose();
          router.push("/register");
        }}
        backgroundColor={Colors.orange}
        style={{ marginTop: 10 }}
      />
    </>
  );
};

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadCards = async () => {
    try {
      const data = await CardService.getCards(4); // Загружаем только 4 карточки
      setCards(data);
    } catch (error) {
      console.error("Ошибка при загрузке карточек:", error);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 48) / 2;

  const handleCardPress = (id: string) => {
    console.log(`Карточка ${id} нажата`);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const renderCardColumns = () => {
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
              <Block images={item.images} label={item.label} />
              {index < rightColumnCards.length - 1 && (
                <View style={styles.cardGap} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, CommonStyles.mainContainer]}>
        <View style={styles.content}>{renderCardColumns()}</View>

        <View style={styles.buttonContainer}>
          <Button title={t("auth.signIn.submitButton")} onPress={handleLogin} />
          <Button
            title={t("auth.signUp.submitButton")}
            backgroundColor={Colors.orange}
            onPress={handleRegister}
          />
        </View>

        <SlideUpModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <RegistrationForm onClose={() => setModalVisible(false)} />
        </SlideUpModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    marginTop: 50,
    paddingBottom: 80,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: -20,
    right: -20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
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

export default Welcome;
