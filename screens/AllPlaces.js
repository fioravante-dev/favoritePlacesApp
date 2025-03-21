import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/places/PlacesList";
import IconButton from "../components/ui/IconButton";
import { fetchPlaces } from "../util/database";

function AllPlaces({ navigation}) {
    const [loadedPlaces,setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused()

    useEffect(() => {
      async function fetchPlacesHandler() {
        console.log("Fetching places");
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      }

      if (isFocused) {
        fetchPlacesHandler();
      }
    },[isFocused]);
    

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          color={tintColor}
          size={24}
          onPress={() => navigation.navigate("AddPlace")}
        />
      ),
    });
  }, [navigation]);




  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
