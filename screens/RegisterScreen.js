import React, { Component } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/Container";
import { randomItemFromArray } from "../global/functions";
import iconsName from "../global/iconsName";
import theme from "../global/theme";
import firebase from "firebase/app";
import "firebase/auth";

export default class RegisterScreen extends Component {
  state = {
    step: 1,
    email: "",
    password: "",
    confPass: "",
    nickname: "",
    icon: "",
  };

  componentDidMount() {
    this.setState({ icon: randomItemFromArray(iconsName) });
  }

  stepControl(control) {
    switch (control) {
      case "next":
        this.setState((prevState) => ({ step: prevState.step + 1 }));
        break;
      case "back":
        this.setState((prevState) => ({ step: prevState.step - 1 }));
        break;
      default:
        break;
    }
  }

  _pressNext = () => {
    if (!this.state.email) return;
    if (!this.state.password || this.state.password.length < 6) return;
    if (this.state.password !== this.state.confPass) return;

    this.stepControl("next");
  };

  _pressBack = () => {
    this.stepControl("back");
  };

  _pressRegister = () => {
    if (!this.state.nickname) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: this.state.nickname,
            photoURL: this.state.icon,
          })
          .then(() => {
            firebase.auth().signOut();
            this.props.navigation.goBack();
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Alert.alert(errorCode, errorMessage);
      });
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
                  <Button
                    mode="contained"
                    icon="account-plus"
                    onPress={this._pressRegister}
                  >
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
