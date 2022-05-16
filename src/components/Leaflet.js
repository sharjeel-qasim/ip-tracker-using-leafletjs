import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LeafletMarker from "./LeafletMarker";

export default function Leaflet({ loadMap, mapPosition, ipData, setMap }) {
  return (
    <>
      {loadMap && (
        <MapContainer
          center={mapPosition}
          zoom={14}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "70vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.linkedin.com/in/sharjeelqasim/">Sharjeel Qasim</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletMarker
            ipData={ipData}
            position={mapPosition}
            setMap={setMap}
          />
        </MapContainer>
      )}
    </>
  );
}
