import { StackNavigationProp } from "@react-navigation/stack";
import Button from "components/Button";
import { useAppDispatch } from "hooks";
import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ridesActions } from "store/rides/slice";

type Props = {
  ride: Ride;
  navigation: StackNavigationProp<StackParams, "Details">;
};

const ActionButton = ({ ride, navigation }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const setStatus = async (status: typeof ride.status) => {
    const { setRide } = ridesActions;
    setLoading(true);
    await dispatch(setRide({ ...ride, status })).unwrap();
    setLoading(false);
  };

  if (ride.status === "dropped-off") {
    return <SafeAreaView edges={["bottom"]} />;
  }

  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={styles.container}>
        {ride.status === "pending" && (
          <Button
            label="ACCEPT RIDE"
            margins={{ bottom: 12 }}
            onPress={() => setStatus("accepted")}
            loading={loading}
          />
        )}

        {ride.status === "accepted" && (
          <Button
            label="PICKED-UP"
            margins={{ bottom: 12 }}
            onPress={() => setStatus("picked-up")}
            loading={loading}
          />
        )}

        {ride.status === "picked-up" && (
          <Button
            label="START"
            margins={{ bottom: 12 }}
            onPress={() => setStatus("started")}
            loading={loading}
          />
        )}

        {ride.status === "started" && (
          <Button
            label="DROP-OFF"
            margins={{ bottom: 12 }}
            onPress={() => setStatus("dropped-off")}
            loading={loading}
          />
        )}

        {ride.status === "pending" && (
          <Button
            label="GO BACK"
            look="outlined"
            onPress={() => navigation.goBack()}
          />
        )}

        {ride.status === "accepted" && (
          <Button
            label="CANCEL"
            look="outlined"
            onPress={() => navigation.goBack()}
            disabled={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { margin: 16 },
});

export default memo(ActionButton);
