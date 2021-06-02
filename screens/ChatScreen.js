import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default class ChatScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button onPress={() => this.props.navigation.navigate("ProfileScreen")}>
          โปรไฟล์
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
