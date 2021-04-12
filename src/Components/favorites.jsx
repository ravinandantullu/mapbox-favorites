import React, { Component } from "react";

class Favorites extends Component {
  render() {
    return (
      <div>
        <h1>Favorites Point of intrests</h1>
        <ul>
          {this.props.favorites.map((favorite, i) => (
            <div key={i}>
              <li key={i}>
                {favorite.place_name} <button id={favorite.id}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
