import React from "react";
import mapboxGl from "mapbox-gl";
import style from "../data/style.json";

// If there are issues, replace with your token
const ACCESS_TOKEN = "pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg";
const GEOCODINGAPIURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'; 

class MapView extends React.Component {
  constructor() {
    super();
    this.mapContainer = React.createRef();
    this.state = {
      mapArray: [],
    };
  }

  componentDidMount = () => {
    const containerEl = this.mapContainer;
    if (containerEl && containerEl.current) {
      mapboxGl.accessToken = ACCESS_TOKEN;
      const map = new mapboxGl.Map({
        container: containerEl.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-77.04, 38.907],
        zoom: 15,
      });

      map.on("click", (e) => {
        let that = this;
        console.log("A click event has occurred at " + e.lngLat);
        let url = `${GEOCODINGAPIURL}${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${ACCESS_TOKEN}&types=poi`; 
        console.log(url);
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            that.state.mapArray.push({
              place_name: data.features[0].place_name,
              coordinates: data.features[0].geometry.coordinates,
              category: data.features[0].properties.category
            });
            console.log(this.state.mapArray);
          });
      });
      
      var loadSource = () => {
       
      };

      map.on("data", loadSource);

      this.setState({ map });
    }
  };

  render() {
    return <div ref={this.mapContainer} className="map-container" />;
  }
}

export default MapView;
