import React from "react";
import { Dimensions, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Avatar, Caption, Card, Paragraph, Text } from "react-native-paper";
import theme from "../global/theme";

export default function MessageChip(props) {
  const name = props.name;
  const icon = props.icon;
  const message = props.message;
  const timestamp = props.timestamp;
  const me = props.me;

  const windowWidth = Dimensions.get("window").width;
  const width = windowWidth >= 500 ? 500 : (windowWidth * 3) / 4;

  return (
    <View
      {...props}
      style={{
        marginBottom: 7,
        alignItems: me ? "flex-end" : "flex-start",
      }}
    >
      <Caption>
        {!me && <Caption style={{ fontWeight: "bold" }}>{name}</Caption>}
        {!me && " • "}
        {timestamp}
      </Caption>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: width,
        }}
      >
        {!me && (
          <Avatar.Icon icon={icon} size={14 * 3} style={{ marginRight: 7 }} />
        )}
        <View style={{ flex: 1 }}>
          <Card
            style={{
              alignSelf: me ? "flex-end" : "flex-start",
              backgroundColor: me ? theme.colors.primary : theme.colors.surface,
            }}
          >
            <Card.Content>
              <Paragraph
                style={{
                  color: me ? theme.colors.surface : theme.colors.onSurface,
                }}
              >
                {message}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}

MessageChip.propTypes = {
  ...ViewPropTypes,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  me: PropTypes.bool,
};
