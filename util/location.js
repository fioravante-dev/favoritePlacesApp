import { MAPS_API } from "@env";

function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C%7C${lat},${lng}&key=${MAPS_API}`;
  return imagePreviewUrl;
}

export default getMapPreview;
