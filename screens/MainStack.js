import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
