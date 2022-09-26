import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import 'mapbox-gl/dist/mapbox-gl.css';
const demos = () => {
  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken =
      'pk.eyJ1IjoiMTc2NDk2MjA3MSIsImEiOiJjbDhpZHV4NjQwbTFqM3BvNWI4ZTJtYjZoIn0.9bwS4p4kFyi12iIcK3SdmA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9', // style URL
      center: [118, 33], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // projection: 'globe', // display the map as a 3D globe
    });
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }, []);
  return <div id="map" style={{ width: '100%', height: '600px' }}></div>;
};

export default demos;
