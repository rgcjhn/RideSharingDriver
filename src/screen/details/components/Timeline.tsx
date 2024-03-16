import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Content from "components/Content";
import * as Location from "expo-location";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DashedLine from "react-native-dashed-line";
import R from "res/R";

type Props = {
  ride: Ride;
};

const Timeline = ({ ride }: Props) => {
  const [pickupAddress, setPickupAddress] = useState<
    Location.LocationGeocodedAddress[]
  >([]);
  const [destinationAddress, setDestinationAddress] = useState<
    Location.LocationGeocodedAddress[]
  >([]);

  useEffect(() => {
    const task = async () => {
      let result = await Location.reverseGeocodeAsync({
        longitude: ride.pickupLocation.longitude,
        latitude: ride.pickupLocation.latitude,
      });

      setPickupAddress(result);

      result = await Location.reverseGeocodeAsync({
        longitude: ride.destination.longitude,
        latitude: ride.destination.latitude,
      });

      setDestinationAddress(result);
    };

    task();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <View style={styles.iconContainer}>
          <Entypo name="circle" size={22} color={R.colors.normal} />
        </View>
        <View style={styles.address}>
          <Content style={styles.titlePickup}>Pick up location</Content>
          <Content>
            {destinationAddress[0]?.name}, {pickupAddress[0]?.district}
          </Content>
          <Content>Pick up {moment(ride.pickupTime).fromNow()}</Content>
        </View>
      </View>

      <DashedLine
        style={styles.line}
        axis="vertical"
        dashLength={2}
        dashThickness={2}
        dashColor={R.colors.normal}
      />

      <View style={styles.timelineContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="location-pin"
            size={32}
            color={R.colors.primary}
          />
        </View>
        <View style={styles.address}>
          <Content style={styles.titleDestination}>Destination</Content>
          <Content>
            {destinationAddress[0]?.name}, {destinationAddress[0]?.district}
          </Content>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column", marginBottom: 18 },
  timelineContainer: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 18,
  },
  line: {
    position: "absolute",
    top: 48,
    bottom: 40,
    left: 32.25,
  },
  iconContainer: {
    marginTop: 4,
    width: 32,
    alignItems: "center",
  },
  address: { marginLeft: 18, marginTop: 4 },
  titlePickup: { fontWeight: "bold", color: R.colors.normal },
  titleDestination: { fontWeight: "bold", color: R.colors.primary },
});

export default memo(Timeline);
