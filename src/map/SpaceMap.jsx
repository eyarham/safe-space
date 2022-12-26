import { fromLonLat } from "ol/proj";
import React from "react";
import { Controls, FullScreenControl } from "./Controls";
import { Layers, TileLayer } from "./Layers";
import Map from "./Map";
import { osm } from "./Source";

import SpaceOverlay from "../spaces/SpaceOverlay";
import mapConfig from "./config.json";
import Overlay from "./Overlays/Overlay";
import Overlays from "./Overlays/Overlays";

const SpaceMap = ({ center = mapConfig.center, zoom = 14, markers }) => {
  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Overlays>
          {markers && markers.map((m, i) => {
            const { address } = m.data();
            return <Overlay key={i} coor={address.coords}>
              <SpaceOverlay marker={m} />
            </Overlay>
          })}
        </Overlays>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default SpaceMap;
