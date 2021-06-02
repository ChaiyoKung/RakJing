import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./screens/MainStack";
import LoginStack from "./screens/LoginStack";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    // Check user logined?

    return () => {};
  }, []);

  return (
    <>
      <NavigationContainer>
        {isLogined ? <MainStack /> : <LoginStack />}
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
