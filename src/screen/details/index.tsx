import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import R from "res/R";
import { ridesActions } from "store/rides/slice";

import ActionButton from "./components/ActionButton";
import Directions from "./components/Directions";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import UserProfile from "./components/UserProfile";

type Props = StackScreenProps<StackParams, "Details">;

const DetailsScreen = ({ navigation, route }: Props) => {
  const { rideId } = route.params;

  const ride = useAppSelector((s) => s.rides.find((s) => s.id === rideId));

  const dispatch = useAppDispatch();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!ride || ride?.status === "pending") {
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        Alert.alert(
          "Are you sure you want to leave this?",
          "Leaving will invalidate your ride.",
          [
            { text: "Continue", style: "cancel", onPress: () => {} },
            {
              text: "Leave",
              style: "destructive",
              // This will continue the action that had triggered the removal of the screen
              onPress: () => {
                const { setRide } = ridesActions;
                dispatch(setRide({ ...ride, status: "declined" }));
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation, ride]
  );

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
