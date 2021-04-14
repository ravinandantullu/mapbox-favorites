import React from "react";
import "./app.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import MapViewComponent from "./Components/mapView/mapViewComponent";
import FavoritesComponent from "./Components/favorite/favoritesComponent";

class App extends React.Component {
  constructor() {
    super();
    this.childRef = React.createRef();
    this.state = {
      favorites: [],
    };
  }

  updateFavorites(favorite) {
    this.setState({ favorites: [...this.state.favorites, favorite] });
  }

  deleteFavorite(favoriteId) {
    this.setState({
      favorites: this.state.favorites.filter((item) => item.id !== favoriteId),
    });
    document.getElementById(`marker_${favoriteId}`).remove();
  }

  jumpToFavorite(favoriteId) {
    this.childRef.current.jumpToFavorite(
      this.state.favorites.filter((item) => item.id === favoriteId)[0]
    );
  }

  render() {
    return (
      <div className="app-favorite-map">
        <FavoritesComponent
          className="favorite"
          favorites={this.state.favorites}
          deleteFavorite={this.deleteFavorite.bind(this)}
          jumpToFavorite={this.jumpToFavorite.bind(this)}
        ></FavoritesComponent>
        <MapViewComponent
          className="map-view"
          ref={this.childRef}
          updateFavorites={this.updateFavorites.bind(this)}
        ></MapViewComponent>
      </div>
    );
  }
}

export default App;
