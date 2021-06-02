import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";
import CustomAppbar from "../components/CustomAppbar";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomAppbar {...props} />,
      }}
    >
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: "ห้องแห่งความลับ 666" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "โปรไฟล์" }}
      />
    </Stack.Navigator>
  );
}
