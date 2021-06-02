import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Headline, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import theme from "../global/theme";
import firebase from "firebase/app";
import "firebase/auth";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    btnLoginIsLoading: false,
  };

  _pressLogin = () => {
    if (!this.state.email) {
      this.inputEmailRef.focus();
      return;
    }

    if (!this.state.password) {
      this.inputPasswordRef.focus();
      return;
    }

    this.setState({ btnLoginIsLoading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        this.setState({ btnLoginIsLoading: false });
      });
  };

  _pressRegister = () => {
    this.props.navigation.navigate("RegisterScreen");
  };

  render() {
    return (
      <Container bg={theme.colors.surface}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Text style={styles.headline}>รักจริง</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={(ref) => (this.inputEmailRef = ref)}
              mode="outlined"
              label="อีเมล"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
              returnKeyType="next"
              style={{ marginBottom: 7 }}
              onSubmitEditing={() => this.inputPasswordRef.focus()}
            />
            <TextInput
              ref={(ref) => (this.inputPasswordRef = ref)}
              mode="outlined"
              label="รหัสผ่าน"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
              onSubmitEditing={this._pressLogin}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              icon="login"
              onPress={this._pressLogin}
              loading={this.state.btnLoginIsLoading}
              style={{ marginBottom: 14 }}
            >
              เข้าสู่ระบบ
            </Button>
            <Button mode="outlined" onPress={this._pressRegister}>
              สมัครสมาชิก
            </Button>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    padding: 14,
  },
  headline: {
    fontWeight: "bold",
    color: theme.colors.primary,
    fontSize: 14 * 3,
  },
  inputWrapper: {
    paddingHorizontal: 14,
    marginBottom: 14 * 2,
  },
  buttonWrapper: {
    paddingHorizontal: 14,
  },
});
