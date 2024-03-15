import Content from "components/Content";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import R from "res/R";

type Props = {
  ride: Ride;
};

const Status = ({ ride }: Props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: R.colors[ride.status] }]}
    >
      <Content style={styles.t}>{ride.status.toUpperCase()}</Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -85,
    right: -80,
    height: 160,
    width: 180,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    transform: [{ rotate: "40deg" }],
  },
  t: {
    fontWeight: "600",
    letterSpacing: 0.5,
    color: R.colors.white,
  },
});

export default memo(Status);
