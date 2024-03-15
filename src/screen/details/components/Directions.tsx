import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { LayoutRectangle, StyleSheet, View } from "react-native";
import MapView, { MapMarker } from "react-native-maps";
import R from "res/R";
type Props = {
  ride: Ride;
};

const Directions = ({ ride }: Props) => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const map = useRef<MapView | null>();

  useEffect(() => {
    setTimeout(() => {
      //   map.current?.fitToSuppliedMarkers(["pickup", "location"], {
      //     animated: true,
      //     edgePadding: { top: 70, bottom: 70, left: 70, right: 70 },
      //   });
      map.current?.fitToElements();
    }, 1000);
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setLayout(event.nativeEvent.layout);
      }}
    >
      {layout && (
        <MapView
          ref={(v) => (map.current = v)}
          style={{ height: layout.height, width: layout.width }}
        >
          <MapMarker
            identifier="pickup"
            coordinate={{
              latitude: ride.pickupLocation.latitude,
              longitude: ride.pickupLocation.longitude,
            }}
            description="Pickup"
          >
            <FontAwesome6
              name="location-pin"
              size={32}
              color={R.colors.secondary}
            />
          </MapMarker>
          <MapMarker
            identifier="destination"
            coordinate={{
              latitude: ride.destination.latitude,
              longitude: ride.destination.longitude,
            }}
            pinColor={R.colors.primary}
            description="Destination"
          >
            <FontAwesome6
              name="location-pin"
              size={32}
              color={R.colors.primary}
            />
          </MapMarker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Directions;
