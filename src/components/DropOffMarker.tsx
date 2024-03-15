import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { MapMarker } from "react-native-maps";
import R from "res/R";

type Props = {
  ride: Ride;
  onPress?: () => void;
};

const DropOffMarker = ({ ride, onPress = () => {} }: Props) => {
  return (
    <MapMarker
      key={ride.id}
      coordinate={{
        latitude: ride.destination.latitude,
        longitude: ride.destination.longitude,
      }}
      onPress={onPress}
      description="Drop-off"
    >
      <View style={styles.icon}>
        <View style={styles.circle} />
      </View>
      <View style={styles.triangle} />
    </MapMarker>
  );
};

const triangleSize = 7;

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: R.colors.primary,
    zIndex: 1,
    shadowColor: R.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    backgroundColor: R.colors.white,
  },
  triangle: {
    marginLeft: 9,
    marginTop: -4,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: triangleSize,
    borderRightWidth: triangleSize,
    borderBottomWidth: triangleSize * 2,
    borderLeftColor: R.colors.invisible,
    borderRightColor: R.colors.invisible,
    borderBottomColor: R.colors.primary,
    transform: [{ rotate: "180deg" }],
    shadowColor: R.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default memo(DropOffMarker);
