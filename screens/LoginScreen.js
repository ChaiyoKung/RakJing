import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import theme from "../global/theme";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
  };

  _pressLogin = () => {
    // Login
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
              mode="outlined"
              label="อีเมล"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
              style={{ marginBottom: 7 }}
            />
            <TextInput
              mode="outlined"
              label="รหัสผ่าน"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              icon="login"
              onPress={this._pressLogin}
              style={{ marginBottom: 14 }}
            >
              เข้าสู่ระบบ
            </Button>
            <Button
              mode="contained"
              onPress={this._pressRegister}
              color={theme.colors.accent}
            >
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
