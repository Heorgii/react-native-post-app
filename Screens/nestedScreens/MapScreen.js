import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude,
          latitude,
          longitudeData: "0.001",
          latitudeData: "0.006",
        }}
      >
        <Marker coordinate={{ longitude, latitude }} title="place" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
