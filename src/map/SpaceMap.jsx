import { fromLonLat } from "ol/proj";
import React, { useEffect, useState } from "react";
import { Controls, FullScreenControl } from "./Controls";
import { Layers, TileLayer } from "./Layers";
import Map from "./Map";
import { osm } from "./Source";

import SpaceOverlay from "../spaces/SpaceOverlay";
import SpaceOverlaySmall from "../spaces/SpaceOverlaySmall";
import mapConfig from "./config.json";
import Overlay from "./Overlays/Overlay";
import Overlays from "./Overlays/Overlays";

const SpaceMap = ({ center = mapConfig.center, zoom = 14, markers }) => {
  const [overlays, setOverlays] = useState();
  useEffect(() => {
    const overlaysBuild = markers && markers.map((m, i) => {
      const { address } = m.data();
      if (zoom < 16) {
        return <Overlay key={i} coor={address.coords}>
          <SpaceOverlaySmall marker={m} />
        </Overlay>
      }
      else {
        return <Overlay key={i} coor={address.coords}>
          <SpaceOverlay marker={m} />
        </Overlay>
      }
    })
    setOverlays(overlaysBuild)
  }, [markers, zoom])

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Overlays>
          {overlays}
        </Overlays>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default SpaceMap;
