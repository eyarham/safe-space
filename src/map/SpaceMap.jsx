import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import React, { useEffect, useState } from "react";
import { Controls, FullScreenControl } from "./Controls";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import Map from "./Map";
import { osm, vector } from "./Source";

import mapConfig from "./config.json";

const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);  
    feature.addEventListener("click", ()=>{alert("ahoy")})  
    return feature;
  });
  return features;
}

const SpaceMap = ({ center = mapConfig.center, zoom = 11, markers=markersLonLat }) => {
  //const [center, setCenter] = useState(mapConfig.center);
  //const center = mapConfig.center;
  //const [zoom, setZoom] = useState(9);
  //const zoom = 9


  const [features, setFeatures] = useState();
  useEffect(() => {
    setFeatures(addMarkers(markers));
  }, [markers])

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer source={vector({ features })} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default SpaceMap;
