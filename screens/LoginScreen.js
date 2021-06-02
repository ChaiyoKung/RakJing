import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text> LoginScreen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
        >
          สมัครสมาชิก
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
