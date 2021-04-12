import React, { Component } from "react";

class Favorites extends Component {
  render() {
    return (
      <div>
        <h1>Favorites Point of Intrests</h1>
        <ul>
          {this.props.favorites.map((favorite, i) => (
            <div key={i}>
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

export default Favorites;
