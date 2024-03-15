import DropOffMarker from "components/DropOffMarker";
import UserMarker from "components/UserMarker";
import React, { useEffect, useRef, useState } from "react";
import { LayoutRectangle, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
type Props = {
  ride: Ride;
};

const Directions = ({ ride }: Props) => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const map = useRef<MapView | null>();

  useEffect(() => {
    setTimeout(() => {
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
          showsUserLocation
        >
          <UserMarker ride={ride} />
          <DropOffMarker ride={ride} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Directions;
