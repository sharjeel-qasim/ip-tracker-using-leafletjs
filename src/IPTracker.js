import { useState, useEffect } from "react";
import { ipDataAPIKey } from "./utils/constant";
import { ipDataBaseURL } from "./configs/ipData-endpoint";
import { showError } from "./API/toastifyAPI";
import LeafletMap from "./components/Leaflet";
import IPSearchContainer from "./components/IPSearch";
import { Row } from "react-bootstrap";

var requestOptions = {
  method: "GET",
};

function IPTracker() {
  const [loadMap, setLoadMap] = useState(false);
  const [map, setMap] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [mapPosition, setMapPosition] = useState([33.771542, 72.751091]);
  const [ipData, setIpData] = useState([]);

  useEffect(() => {
    // load current locaton ip and set it
    fetchCurrentIPAddress();
  }, []);

  const fetchCurrentIPAddress = () => {
    // Getting current user ip address
    fetch(`${ipDataBaseURL}?api-key=${ipDataAPIKey}`, requestOptions)
      .then((response) => response.json())
      .then((ipData) => {
        setIpAddress(ipData.ip);
        fetchIpData();
      })
      .catch((error) => showError(String(error)));
  };

  const handleIpAddressChange = (e) => {
    const { value } = e.currentTarget;
    // Setting ip address to state on change to show on search box
    setIpAddress(value);
  };

  const fetchIpData = () => {
    // getting search ip address data like location etc.
    fetch(
      `${ipDataBaseURL}/${ipAddress}?api-key=${ipDataAPIKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((ipData) => {
        const { message } = ipData;
        if (message) {
          // message will only come when API throw error
          showError(message);
          setIpData([]);
        } else {
          setIpData(ipData);
          const position = [ipData.latitude, ipData.longitude];
          // Setting current location lat lng for marker
          setMapPosition(position);

          // Loading map with delay so map positon set to state
          setTimeout(setLoadMap(true), 2000);

          if (map) {
            // fly to marker positon on marker postion change
            map.flyTo(position, 14, {
              duration: 2,
            });
          }
        }
      })
      .catch((error) => {
        showError(String(error));
      });
  };

  return (
    <>
      <Row className="ip-input-container">
        <IPSearchContainer
          ipAddress={ipAddress}
          handleIpAddressChange={handleIpAddressChange}
          ipData={ipData}
          fetchIpData={fetchIpData}
        />
      </Row>
      <Row>
        <LeafletMap
          ipData={ipData}
          mapPosition={mapPosition}
          loadMap={loadMap}
          setMap={setMap}
        />
      </Row>
    </>
  );
}

export default IPTracker;
