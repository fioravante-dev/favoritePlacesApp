import { useEffect, useState } from "react";

import PlacesList from "../components/places/PlacesList";
import IconButton from "../components/ui/IconButton";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ navigation, route }) {
    const [loadedPlaces,setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused && route.params) {
            setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place]);
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
