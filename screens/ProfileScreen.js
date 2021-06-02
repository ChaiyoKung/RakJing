import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import theme from "../global/theme";
import firebase from "firebase/app";
import "firebase/auth";

export default class ProfileScreen extends Component {
  state = {
    name: "",
    icon: "",
    btnLogoutIsLoading: false,
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const { displayName, photoURL } = firebase.auth().currentUser;
    this.setState({ name: displayName, icon: photoURL });
  }

  _pressLogout = () => {
    this.setState({ btnLogoutIsLoading: true });

    firebase
      .auth()
      .signOut()
      .catch((error) => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        this.setState({ btnLogoutIsLoading: false });
      });
  };

  render() {
    return (
      <Container bg={theme.colors.surface}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.infoWrapper}>
            <Avatar.Icon icon={this.state.icon} size={14 * 10} />
            <Text style={styles.name}>{this.state.name}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              mode="outlined"
              onPress={this._pressLogout}
              loading={this.state.btnLogoutIsLoading}
            >
              ออกจากระบบ
            </Button>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  infoWrapper: {
    paddingHorizontal: 14,
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    color: theme.colors.primary,
    fontSize: 14 * 2.5,
  },
  buttonWrapper: {
    alignItems: "center",
    padding: 14,
  },
});
