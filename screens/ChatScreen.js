import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Button, Divider, IconButton, TextInput } from "react-native-paper";
import Container from "../components/Container";
import MessageChip from "../components/MessageChip";
import theme from "../global/theme";

export default class ChatScreen extends Component {
  state = {
    messages: [
      {
        type: "text",
        content:
          "Hi! I'm name is Chaiyo. 5555555555555555555555555555555555555555555",
        timestamp: 123456986544,
        by: { uid: "asdfghjkl", name: "นายมะม่วง", profileIcon: "pencil" },
      },
      {
        type: "text",
        content: "How are you.",
        timestamp: 123456986544,
        by: { uid: "asdfghjkl", name: "นายมะม่วง", profileIcon: "pencil" },
      },
      {
        type: "text",
        content: "I'm find. Thankyou. and you?",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "Sorry na",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "How are you.",
        timestamp: 123456986544,
        by: { uid: "asdfghjkl", name: "นายมะม่วง", profileIcon: "pencil" },
      },
      {
        type: "text",
        content: "I'm find. Thankyou. and you?",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "Sorry na",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "Sorry na",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "How are you.",
        timestamp: 123456986544,
        by: { uid: "asdfghjkl", name: "นายมะม่วง", profileIcon: "pencil" },
      },
      {
        type: "text",
        content: "I'm find. Thankyou. and you?",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
      {
        type: "text",
        content: "Sorry na",
        timestamp: 123456986544,
        by: { uid: "a123456", name: "มะละกอ", profileIcon: "book" },
      },
    ],
    uid: "a123456",
    message: "",
  };

  _pressSend = () => {
    // Send Message
  };

  render() {
    return (
      <Container>
        <ScrollView style={styles.scrollView}>
          {this.state.messages.map((message, index) => {
            if (message.type === "text") {
              return (
                <MessageChip
                  key={index.toString()}
                  name={message.by.name}
                  icon={message.by.profileIcon}
                  message={message.content}
                  timestamp={message.timestamp}
                  me={this.state.uid === message.by.uid}
                />
              );
            }
          })}
        </ScrollView>
        <Divider />
        <View style={styles.inputWrapper}>
          <TextInput
            mode="outlined"
            value={this.state.message}
            onChangeText={(message) => this.setState({ message })}
            placeholder="ข้อความ..."
            multiline
            style={{ flex: 1, marginBottom: 6 }}
          />
          <IconButton
            icon="send"
            color={theme.colors.primary}
            onPress={this._pressSend}
            style={{ marginLeft: 7 }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 14,
  },
  inputWrapper: {
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    paddingHorizontal: 7,
    alignItems: "center",
  },
});
