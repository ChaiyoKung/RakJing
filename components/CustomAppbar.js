import React from "react";
import { Appbar } from "react-native-paper";
import theme from "../global/theme";

export default function CustomAppbar({ scene, navigation, previous }) {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : null}
      <Appbar.Content
        title={title}
        titleStyle={{ color: theme.colors.primary }}
      />
      {scene.route.name === "ChatScreen" && (
        <Appbar.Action
          icon="account-circle"
          color={theme.colors.primary}
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      )}
    </Appbar.Header>
  );
}
