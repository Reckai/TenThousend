import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Welcome from "./screens/welcome/welcome";

// Определение возможных маршрутов
export const Routes = {
  Welcome: "Welcome",
  Login: "Login",
  Register: "Register",
  Home: "Home",
  Profile: "Profile",
  Settings: "Settings",
};

// Создаем стек навигации
export const RootStack = createNativeStackNavigator({
  initialRouteName: Routes.Welcome,
  screenOptions: {
    headerShown: false,
    contentStyle: { backgroundColor: "white" },
  },
  screens: {
    [Routes.Welcome]: {
      screen: Welcome,
      options: {
        title: "Welcome",
      },
    },
    [Routes.Login]: {
      screen: Login,
      options: {
        title: "Login",
      },
    },
    [Routes.Register]: {
      screen: Register,
      options: {
        title: "Register",
      },
    },
  },
});

// Создаем статическую навигацию
export const Navigation = createStaticNavigation(RootStack);
