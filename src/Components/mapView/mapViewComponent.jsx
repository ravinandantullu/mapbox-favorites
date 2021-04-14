import React from "react";
import mapboxGl from "mapbox-gl";
// import style from "../data/style.json";
import "./mapViewComponent.scss";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg";
const GEOCODINGURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

class MapViewComponent extends React.Component {
  constructor() {
    super();
    this.mapContainer = React.createRef();
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
        let url = `${GEOCODINGURL}${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${ACCESS_TOKEN}&types=poi`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const coordinates = data.features[0].geometry.coordinates;
            const id = data.features[0].properties.foursquare;

            let el = document.createElement("div");
            el.className = "marker";
            el.id = `marker_${id}`;
            new mapboxGl.Marker(el).setLngLat(coordinates).addTo(map);

            let favorite = {
              id: id,
              place_name: data.features[0].place_name.split(",")[0],
              coordinates: coordinates,
              category: data.features[0].properties.category,
            };
            this.props.updateFavorites(favorite);
          });
      });

      this.setState({ map });
    }
  };

  jumpToFavorite(favorite) {
    this.state.map.flyTo({
      center: favorite.coordinates,
      zoom: 17,
      bearing: 0,
      speed: 0.7,
      curve: 1,
      easing: function(t) {
        return t;
      },
      essential: true,
    });
  }

  render() {
    return <div ref={this.mapContainer} className="map-container" />;
  }
}

export default MapViewComponent;
