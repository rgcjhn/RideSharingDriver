import { StackScreenProps } from "@react-navigation/stack";
import * as Location from "expo-location";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { ridesActions } from "store/rides/slice";

type Props = StackScreenProps<StackParams, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const rides = useAppSelector((s) => s.rides);

  const dispatch = useAppDispatch();
  const map = useRef<MapView | null>();

  useEffect(() => {
    const { fetchRides } = ridesActions;

    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showMessage({ message: "Permission to access location was denied" });
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      map.current?.animateToRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.1222,
        longitudeDelta: 0.0821,
      });

      dispatch(fetchRides(location));
    };
    getLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={(v) => (map.current = v)}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
      >
        {rides
          .filter((ride) => ride.status === "pending")
          .map((ride) => {
            return (
              <MapMarker
                key={ride.id}
                coordinate={{
                  latitude: ride.pickupLocation.latitude,
                  longitude: ride.pickupLocation.longitude,
                }}
                onPress={() => {
                  navigation.navigate("Details", { rideId: ride.id });
                }}
              />
            );
          })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
