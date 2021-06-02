import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import MainStack from "./screens/MainStack";
import LoginStack from "./screens/LoginStack";
import theme from "./global/theme";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    // Check user logined?

    return () => {};
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLogined ? <MainStack /> : <LoginStack />}
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
