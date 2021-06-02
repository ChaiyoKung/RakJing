import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomAppbar from "../components/CustomAppbar";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomAppbar {...props} />,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "สมัครสมาชิก" }}
      />
    </Stack.Navigator>
  );
}
