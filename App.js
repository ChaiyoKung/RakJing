import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import Constants from "expo-constants";
import firebase from "firebase/app";
import "firebase/auth";
import MainStack from "./screens/MainStack";
import LoginStack from "./screens/LoginStack";
import theme from "./global/theme";
import AppLoading from "expo-app-loading";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebaseConfig);
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    // Check user logined?
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogined(true);
      } else {
        setIsLogined(false);
      }

      setIsReady(true);
    });

    return () => {};
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLogined ? <MainStack /> : <LoginStack />}
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
