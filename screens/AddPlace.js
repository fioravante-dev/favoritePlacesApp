import PlaceForm from "../components/places/PlaceForm";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return <PlaceForm onSavePlace={createPlaceHandler} />;
}

export default AddPlace;
