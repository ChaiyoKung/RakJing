import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import theme from "../global/theme";

export default class RegisterScreen extends Component {
  state = {
    step: 1,
    email: "",
    password: "",
    confPass: "",
    nickname: "",
    icon: "home",
  };

  _pressNext = () => {
    this.setState((prevState) => ({ step: prevState.step + 1 }));
  };

  _pressBack = () => {
    this.setState((prevState) => ({ step: prevState.step - 1 }));
  };

  _pressRegister = () => {
    // Register
  };

  render() {
    return (
      <Container bg={theme.colors.surface}>
        <SafeAreaView>
          {this.state.step === 1 ? (
            <View>
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
                  style={{ marginBottom: 7 }}
                />
                <TextInput
                  mode="outlined"
                  label="ยืนยันรหัสผ่าน"
                  value={this.state.confPass}
                  onChangeText={(confPass) => this.setState({ confPass })}
                  secureTextEntry
                />
              </View>
              <View style={[styles.buttonWrapper, { alignItems: "flex-end" }]}>
                <Button mode="contained" onPress={this._pressNext}>
                  ถัดไป
                </Button>
              </View>
            </View>
          ) : (
            this.state.step === 2 && (
              <View>
                <View style={styles.profileWrapper}>
                  <Avatar.Icon
                    icon={this.state.icon}
                    size={14 * 7}
                    style={{ marginBottom: 7, alignSelf: "center" }}
                  />
                  <TextInput
                    mode="outlined"
                    label="ชื่อเล่น"
                    placeholder="ใส่ชื่อที่คิดว่าจะไม่มีใครรู้ว่าคือคุณ"
                    value={this.state.nickname}
                    onChangeText={(nickname) => this.setState({ nickname })}
                  />
                </View>
                <View
                  style={[
                    styles.buttonWrapper,
                    { flexDirection: "row", justifyContent: "space-between" },
                  ]}
                >
                  <Button mode="outlined" onPress={this._pressBack}>
                    ย้อนกลับ
                  </Button>
                  <Button mode="contained" onPress={this._pressRegister}>
                    สมัครสมาชิก
                  </Button>
                </View>
              </View>
            )
          )}
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 14,
    marginBottom: 14 * 2,
  },
  buttonWrapper: {
    paddingHorizontal: 14,
  },
  profileWrapper: {
    paddingHorizontal: 14,
    marginBottom: 14 * 2,
  },
});
