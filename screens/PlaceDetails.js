import { Image, ScrollView, StyleSheet, View, Text } from "react-native";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [selectedPlace, setSelectedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map",{
        lat: selectedPlace.location.lat,
        lng: selectedPlace.location.lng
    })
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function fetchPlace() {
      const place = await fetchPlaceById(selectedPlaceId);
      setSelectedPlace(place);

      navigation.setOptions({
        title: place.title,
      });
    }

    fetchPlace();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return(
        <View style={styles.fallback}>
            <Text>Loading data...</Text>
        </View>
    )
  }

  return (
    <ScrollView>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
