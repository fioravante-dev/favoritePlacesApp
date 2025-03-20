import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";

import IconButton from "../components/ui/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  const initialRegion = {
    latitude: -19.9167,
    longitude: -43.9345,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    console.log("Map coords:", lat, lng);

    setSelectedLocation({
      lat: lat,
      lng: lng,
    });

    console.log("selectedLocation:", selectedLocation);
  }

  const savePickedLocationHandler = useCallback(() => {
    console.log("Pressed save");
    if (!selectedLocation) {
      console.log(selectedLocation);
      Alert.alert(
        "No location picked",
        "Please pick a location on the map before saving."
      );
      return;
    }
    navigation.navigate("AddPlaceScreen", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title="Picked Location"
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
