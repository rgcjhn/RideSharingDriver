import { StackScreenProps } from "@react-navigation/stack";
import Button from "components/Button";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import R from "res/R";
import { ridesActions } from "store/rides/slice";

import Directions from "./components/Directions";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import UserProfile from "./components/UserProfile";

type Props = StackScreenProps<StackParams, "Details">;

const DetailsScreen = ({ navigation, route }: Props) => {
  const { rideId } = route.params;

  const ride = useAppSelector((s) => s.rides.find((s) => s.id === rideId));

  const dispatch = useAppDispatch();

  const onAcceptRide = () => {
    if (!ride) return;
    const { setRide } = ridesActions;
    dispatch(setRide({ ...ride, status: "accepted" }));
  };

  if (!ride) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserProfile ride={ride} />
      <Timeline ride={ride} />
      <Directions ride={ride} />
      <Status ride={ride} />
      <SafeAreaView edges={["bottom"]}>
        <View style={styles.buttons}>
          <Button
            label="ACCEPT RIDE"
            margins={{ bottom: 12 }}
            onPress={onAcceptRide}
          />
          <Button label="GO BACK" look="outlined" onPress={navigation.goBack} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
  },
  buttons: {
    margin: 16,
  },
});

export default DetailsScreen;
