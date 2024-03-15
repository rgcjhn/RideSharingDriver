import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import R from "res/R";

const Content = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyles.p, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyles = StyleSheet.create({
  p: {
    color: R.colors.normal,
    fontSize: 16,
  },
});

export default Content;
