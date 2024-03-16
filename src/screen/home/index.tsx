import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Content from "components/Content";
import UserMarker from "components/UserMarker";
import * as Location from "expo-location";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { AppState, Linking, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import R from "res/R";
import { ridesActions } from "store/rides/slice";

type Props = StackScreenProps<StackParams, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [ready, setReady] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus>();

  const rides = useAppSelector((s) => s.rides);

  const dispatch = useAppDispatch();
  const focused = useIsFocused();
  const map = useRef<MapView | null>();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    // If no rides are available, display an error message
    if (
      ready &&
      focused &&
      permissionStatus === "granted" &&
      rides.filter((ride) => ride.status === "pending").length === 0
    ) {
      setTimeout(() => {
        showMessage({
          message: "Sorry, no nearby rides found",
          duration: 2000,
        });
      }, 1000);
    }
  }, [ready, rides, permissionStatus, focused]);

  useEffect(() => {
    // If location services are enabled in the settings, reattempt fetching ride requests
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (permissionStatus !== "granted") {
          getLocationPermission();
        }
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [permissionStatus]);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status !== "granted") {
      showMessage({
        message: "Permission to access location was denied",
        duration: 2000,
      });
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    map.current?.animateToRegion({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      latitudeDelta: 0.1222,
      longitudeDelta: 0.0821,
    });

    try {
      const { fetchRides } = ridesActions;
      await dispatch(fetchRides(location)).unwrap();
      setReady(true);
    } catch {
      showMessage({
        message: "Failed to retrieve data: Error fetching data",
        duration: 2000,
      });
    }
  };

  // Conceal map UI when location services are denied
  if (permissionStatus && permissionStatus !== "granted") {
    return (
      <View style={styles.noPermission}>
        <Content>Permission to access location is required</Content>
        <Content
          style={styles.requestPermission}
          onPress={() => Linking.openSettings()}
        >
          Enable location
        </Content>
      </View>
    );
  }

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
          .map((ride) => (
            <UserMarker
              key={ride.id}
              ride={ride}
              onPress={() => {
                navigation.navigate("Details", { rideId: ride.id });
              }}
            />
          ))}
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
  noPermission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  requestPermission: {
    color: R.colors.primary,
    marginTop: 4,
  },
});

export default HomeScreen;
