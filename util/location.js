import { MAPS_API } from "@env";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C%7C${lat},${lng}&key=${MAPS_API}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API}`;
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
