import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";

import IconButton from "../components/ui/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params?.lat,
    lng: route.params?.lng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const initialRegion = {
    latitude: initialLocation ? initialLocation.lat : -19.9167,
    longitude: initialLocation ? initialLocation.lng : -43.9345,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      title: "Pick a Location",
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [
    navigation,
    savePickedLocationHandler,
    selectedLocation,
    initialLocation,
  ]);

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "Please pick a location on the map before saving."
      );
      return;
    }
    navigation.navigate("AddPlace", {
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
