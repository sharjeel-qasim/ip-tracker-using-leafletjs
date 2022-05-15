import React from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import ArrowIcon from "../assets/images/icon-arrow.svg";

export default function IPSearch({
  ipData,
  handleIpAddressChange,
  fetchIpData,
  ipAddress,
}) {
  return (
    <>
      <Col xl="12">
        <h2 className="ip-input-container-heading">IP Address Tracker</h2>
        <InputGroup className="mb-3 input-group-container">
          <FormControl
            placeholder="Search for any IP address or domain"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            className="search-input"
            value={ipAddress}
            onChange={(e) => handleIpAddressChange(e)}
          />
          <Button className="search-button" onClick={fetchIpData}>
            <img src={ArrowIcon} alt="Search Icon" />
          </Button>
        </InputGroup>
      </Col>
      <Col xl="12">
        <Row className="tracking-results">
          <Col className="tracking-content">
            <p className="tracking-results-p">IP ADDRESS</p>
            <h5>{ipData && ipData.ip ? ipData.ip : "-"}</h5>
          </Col>

          <Col className="tracking-content">
            <p className="tracking-results-p">LOCATION</p>
            <h5>
              {ipData && ipData.country_name
                ? `${ipData.city ? ipData.city : ipData.continent_name}, ${
                    ipData.country_name
                  }`
                : "-"}
            </h5>
          </Col>

          <Col className="tracking-content">
            <p className="tracking-results-p">TIMEZONE</p>
            <h5>
              {ipData && ipData.time_zone
                ? `${ipData.time_zone.offset} (${ipData.time_zone.name})`
                : "-"}
            </h5>
          </Col>

          <Col className="tracking-content">
            <p className="tracking-results-p">ISP</p>
            <h5>{ipData && ipData.asn ? ipData.asn.name : "-"}</h5>
          </Col>
        </Row>
      </Col>
    </>
  );
}
