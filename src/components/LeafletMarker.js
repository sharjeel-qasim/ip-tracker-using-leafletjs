import React from "react";
import { useMap, Marker } from "react-leaflet";
import LocationIcon from "../assets/images/icon-location.svg";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: LocationIcon,
  iconRetinaUrl: LocationIcon,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(30, 40), // Marker Size
});

export default function LeafletMarker({ ipData, position, setMap }) {
  const map = useMap();
  setMap(map); // setting map reference to setView on search
  return (
    <Marker
      position={
        ipData && ipData.latitude && ipData.longitude
          ? [ipData.latitude, ipData.longitude]
          : position
      }
      icon={markerIcon}
      eventHandlers={{
        click: () => {
          // on marker click map set view
          map.setView(
            [ipData && ipData.latitude, ipData && ipData.longitude],
            14
          );
        },
      }}
    ></Marker>
  );
}
