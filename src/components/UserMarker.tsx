import { useAppSelector } from "hooks";
import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MapMarker } from "react-native-maps";
import R from "res/R";

type Props = {
  ride: Ride;
  onPress?: () => void;
};

const UserMarker = ({ ride, onPress = () => {} }: Props) => {
  const user = useAppSelector((s) => s.users.find((u) => u.id === ride.userId));

  return (
    <MapMarker
      key={ride.id}
      coordinate={{
        latitude: ride.pickupLocation.latitude,
        longitude: ride.pickupLocation.longitude,
      }}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: user?.image }} />
      <View style={styles.triangle} />
    </MapMarker>
  );
};

const triangleSize = 7;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderWidth: 4,
    borderColor: R.colors.white,
    borderRadius: 20,
    zIndex: 1,
    shadowColor: R.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  triangle: {
    marginLeft: 12.25,
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
    borderBottomColor: R.colors.white,
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

export default memo(UserMarker);
