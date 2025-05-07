import { Colors } from "@/app/utils/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: "#3A3A3A",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          marginBottom: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === "home") {
            icon = (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={color}
              />
            );
          } else if (route.name === "portfolio") {
            icon = (
              <MaterialIcons name="work-outline" size={28} color={color} />
            );
          } else if (route.name === "search") {
            icon = <Ionicons name="search" size={28} color={color} />;
          } else if (route.name === "profile") {
            icon = (
              <AntDesign
                name="user"
                size={28}
                color={focused ? Colors.orange : color}
              />
            );
          }
          return (
            <View style={{ alignItems: "center" }}>
              {icon}
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 0,
                    right: 0,
                    height: 3,
                    borderRadius: 2,
                  }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.home"),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: t("tabs.portfolio"),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("tabs.search"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
        }}
      />
      <Tabs.Screen
        name="profile/language"
        options={{
          href: null,
          title: t("tabs.language"),
        }}
      />
    </Tabs>
  );
}
