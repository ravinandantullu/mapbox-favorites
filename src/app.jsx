import React from "react";
import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapView from "./Components/mapView";
import Favorites from "./Components/favorites";

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
  }

  jumpToFavorite(favoriteId) {
    this.childRef.current.jumpToFavorite(
      this.state.favorites.filter((item) => item.id === favoriteId)[0]
    );
  }

  render() {
    return (
      <div className="App">
        <Favorites
          favorites={this.state.favorites}
          deleteFavorite={this.deleteFavorite.bind(this)}
          jumpToFavorite={this.jumpToFavorite.bind(this)}
        ></Favorites>
        <MapView
          ref={this.childRef}
          updateFavorites={this.updateFavorites.bind(this)}
        ></MapView>
      </div>
    );
  }
}

export default App;
