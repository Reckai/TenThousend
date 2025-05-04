import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Routes = {
  Welcome: "Welcome",
  Login: "Login",
  Register: "Register",
  Home: "Home",
  Profile: "Profile",
  Settings: "Settings",
};

export type RoutesType = {
  Welcome: { name: string } | undefined;
  Login: { name: string } | undefined;
  Register: { name: string } | undefined;
  Home: { name: string } | undefined;
  Profile: { name: string } | undefined;
  Settings: { name: string } | undefined;
};

export type NavigationProps = NativeStackNavigationProp<RoutesType>;
