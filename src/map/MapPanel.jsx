import { fromLonLat } from "ol/proj";
import React from "react";
import { Controls, FullScreenControl } from "./Controls";
import { Layers, TileLayer } from "./Layers";
import Map from "./Map";
import { osm } from "./Source";

import mapConfig from "./config.json";
import Overlays from "./Overlays/Overlays";
import Overlay from "./Overlays/Overlay";

const MapPanel = ({ center = mapConfig.center, zoom = 14, overlays }) => {

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Overlays>
          {overlays && overlays.map((o,i)=>{            
            return <Overlay coor={o.props.coor} key={i}>{o}</Overlay>
          })}
        </Overlays>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default MapPanel;
