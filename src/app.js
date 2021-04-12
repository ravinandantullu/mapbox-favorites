import React, { useState } from "react";
import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapView from "./Components/mapView";
import Favorites from "./Components/favorites";

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      favorites: []
    }
  }

  updateFavorites(favorite) {
    this.setState({favorites: [...this.state.favorites, favorite]}) 
    console.log(this.state.favorites, "Parent Component");
  }

  render() {
    return (
      <div className="App">
        <Favorites favorites={this.state.favorites}></Favorites>
        <MapView updateFavorites={this.updateFavorites.bind(this)}></MapView>
      </div>
    );
  }
}

export default App;
