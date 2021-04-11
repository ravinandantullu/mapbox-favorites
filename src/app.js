import React from 'react';
import './app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapView from './Components/mapView';
import Favorites from './Components/favorites';

function App() {
  return (
    <div className="App">
      <Favorites></Favorites>
      <MapView></MapView>
    </div>
  )
}

export { App };
