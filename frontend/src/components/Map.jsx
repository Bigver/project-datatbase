import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Map() {
  const [coordinates, setCoordinates] = useState({
    lat: 37.7749, // Replace with the desired latitude
    lng: -122.4194, // Replace with the desired longitude
  });

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleSearch = (lat, lng) => {
    setCoordinates({ lat, lng });
  };

  return (
    <div>
      <h1>Your App</h1>
      <button onClick={toggleMap}>Toggle Map</button>
      {showMap && (
        <div>
          <button onClick={() => handleSearch(13.74508499200293, 100.5112886069523)}>Search New York</button>
          <button onClick={() => handleSearch(34.0522, -118.2437)}>Search Los Angeles</button>
          {/* Add more search buttons for other locations if needed */}
          <LoadScript
            googleMapsApiKey="AIzaSyBP_Vcx-qcm1i0Ul3FHWLgrVyeIaj6_hmY" // Replace with your actual Google Maps API key
          >
            <GoogleMap
              id="example-map"
              mapContainerStyle={{
                width: '100%',
                height: '400px',
              }}
              zoom={10}
              center={coordinates}
            >
              <Marker position={coordinates} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
}

export default Map;