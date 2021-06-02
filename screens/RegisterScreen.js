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
    btnRegisterIsLoading: false,
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
    if (!this.state.email) {
      this.inputEmailRef.focus();
      return;
    }

    if (!this.state.password || this.state.password.length < 6) {
      this.inputPasswordRef.focus();
      return;
    }

    if (this.state.password !== this.state.confPass) {
      this.inputConfPassRef.focus();
      return;
    }

    this.stepControl("next");
  };

  _pressBack = () => {
    this.stepControl("back");
  };

  _pressRegister = () => {
    if (!this.state.nickname) {
      this.inputNicknameRef.focus();
      return;
    }

    this.setState({ btnRegisterIsLoading: true });

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
          })
          .catch((error) => {
            Alert.alert(error.code, error.message);
          })
          .finally(() => {
            this.setState({ btnRegisterIsLoading: false });
          });
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        this.setState({ btnRegisterIsLoading: false });
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
                  placeholder="รหัสผ่านจะต้องมีความยาวตั้งแต่ 6 ตัวอักษรขึ้นไป"
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry
                  returnKeyType="next"
                  style={{ marginBottom: 7 }}
                  onSubmitEditing={() => this.inputConfPassRef.focus()}
                />
                <TextInput
                  ref={(ref) => (this.inputConfPassRef = ref)}
                  mode="outlined"
                  label="ยืนยันรหัสผ่าน"
                  placeholder="ใส่รหัสผ่านอีกครั้งเพื่อยืนยัน"
                  value={this.state.confPass}
                  onChangeText={(confPass) => this.setState({ confPass })}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={this._pressNext}
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
                    ref={(ref) => (this.inputNicknameRef = ref)}
                    mode="outlined"
                    label="ชื่อเล่น"
                    placeholder="ใส่ชื่อที่คิดว่าจะไม่มีใครรู้ว่าคือคุณ"
                    value={this.state.nickname}
                    onChangeText={(nickname) => this.setState({ nickname })}
                    onSubmitEditing={this._pressRegister}
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
                    loading={this.state.btnRegisterIsLoading}
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
