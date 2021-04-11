import React, { Component } from 'react';

class Favorites extends Component {
    state = {  }
    render() {
        return ( 
            <div>
                <h1>Mapbox Favorites</h1>
                <li>{}</li>
                <button>Add to Favorites</button>
                <button>Delete from Favorites</button>
            </div>
         );
    }
}
 
export default Favorites;