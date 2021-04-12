import React from "react";
import mapboxGl from "mapbox-gl";
// import style from "../data/style.json";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg";
const GEOCODINGURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

class MapView extends React.Component {
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
            let favorite = {
              id: data.features[0].properties.foursquare,
              place_name: data.features[0].place_name.split(",")[0],
              coordinates: data.features[0].geometry.coordinates,
              category: data.features[0].properties.category,
            };

            const marker = new mapboxGl.Marker()
              .setLngLat(data.features[0].geometry.coordinates)
              .setPopup(
                new mapboxGl.Popup().setHTML(
                  `<h1>${data.features[0].place_name.split(",")[0]}</h1>`
                )
              )
              .addTo(map);
            marker.togglePopup();
            this.props.updateFavorites(favorite);
          });
      });

      this.setState({ map });
    }
  };

  jumpToFavorite(favorite) {
    this.state.map.jumpTo({ center: favorite.coordinates });
  }

  render() {
    return <div ref={this.mapContainer} className="map-container" />;
  }
}

export default MapView;
