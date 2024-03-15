import { StackScreenProps } from "@react-navigation/stack";
import Button from "components/Button";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import R from "res/R";

import Directions from "./components/Directions";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import UserProfile from "./components/UserProfile";

type Props = StackScreenProps<StackParams, "Details">;

const DetailsScreen = ({ navigation, route }: Props) => {
  const { ride } = route.params;

  return (
    <View style={styles.container}>
      <UserProfile ride={ride} />
      <Timeline ride={ride} />
      <Directions ride={ride} />
      <Status ride={ride} />
      <SafeAreaView edges={["bottom"]}>
        <View style={styles.buttons}>
          <Button label="ACCEPT RIDE" margins={{ bottom: 12 }} />
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
