import React from "react";
import { StyleSheet, Pressable, PressableProps } from "react-native";
import R from "res/R";

import Content from "./Content";

type Props = {
  look?: "filled" | "outlined";
  label?: string;
  margins?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export default function Button(props: PressableProps & Props) {
  const {
    look = "filled",
    label = "",
    margins = { top: 0, right: 0, left: 0, bottom: 0 },
  } = props;

  let selectedStyle = styles.filled;
  let selectedTextStyle = styles.filledText;

  if (look === "outlined") {
    selectedStyle = styles.outlined;
    selectedTextStyle = styles.outlinedText;
  }

  return (
    <Pressable
      {...props}
      style={[
        selectedStyle,
        {
          marginTop: margins.top,
          marginBottom: margins.bottom,
          marginRight: margins.right,
          marginLeft: margins.left,
        },
      ]}
    >
      <Content style={selectedTextStyle}>{label}</Content>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: R.colors.primary,
  },
  filledText: {
    fontSize: 16,
    fontWeight: "600",
    color: R.colors.white,
  },
  outlined: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: R.colors.normal,
    backgroundColor: R.colors.invisible,
  },
  outlinedText: {
    fontSize: 16,
    color: R.colors.normal,
    fontWeight: "600",
  },
});
