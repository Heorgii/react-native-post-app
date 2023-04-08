import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: "50.516339",
          latitude: "30.602185",
          longitudeData: "0.001",
          latitudeData: "0.006",
        }}
      >
        <Marker
          coordinate={{ longitude: "50.516339", latitude: "30.602185" }}
          title="place"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default MapScreen;
