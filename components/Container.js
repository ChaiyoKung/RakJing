import React from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

export default function Container(props) {
  const style = props.style;
  const bg = props.bg;

  return (
    <View {...props} style={[{ flex: 1, backgroundColor: bg }, style]}>
      {props.children}
    </View>
  );
}

Container.propTypes = {
  ...ViewPropTypes,
  bg: PropTypes.string,
};
