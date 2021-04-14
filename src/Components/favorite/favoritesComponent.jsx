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
        </ul>
      </div>
    );
  }
}

export default FavoritesComponent;
