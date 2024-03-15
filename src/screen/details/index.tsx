import { StackScreenProps } from "@react-navigation/stack";
import { useAppSelector } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import R from "res/R";

import ActionButton from "./components/ActionButton";
import Directions from "./components/Directions";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import UserProfile from "./components/UserProfile";

type Props = StackScreenProps<StackParams, "Details">;

const DetailsScreen = ({ navigation, route }: Props) => {
  const { rideId } = route.params;

  const ride = useAppSelector((s) => s.rides.find((s) => s.id === rideId));

  if (!ride) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserProfile ride={ride} />
      <Timeline ride={ride} />
      <Directions ride={ride} />
      <Status ride={ride} />
      <ActionButton ride={ride} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
  },
});

export default DetailsScreen;
