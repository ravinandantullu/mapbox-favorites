import React, { Component } from "react";
import "./favoritesComponent.scss";

class FavoritesComponent extends Component {
  render() {
    return (
      <div className="favorites">
        <h1>Points of Interest</h1>
        <ul className="favorite-list">
          {this.props.favorites.map((favorite, i) => (
            <div key={i} className="favorite">
              <li
                key={i}
                onClick={() => this.props.jumpToFavorite(favorite.id)}
              >
                {favorite.place_name}
              </li>
              <button
                id={favorite.id}
                onClick={() => this.props.deleteFavorite(favorite.id)}
              >
                Delete
              </button>
            </div>
          ))}
          <h3>Instructions:</h3>
          <h6>1). Click on the map to add POI's to your bucket list.</h6>
          <h6>2). Use delete button to remove the values from the POI list.</h6>
          <h6>3). Click on the POI list item to toggle between the POI's</h6>
        </ul>
      </div>
    );
  }
}

export default FavoritesComponent;
