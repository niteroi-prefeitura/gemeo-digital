import Point from "@arcgis/core/geometry/Point";
import BusTrip from "../domain/BusTrip";
import { useGraphicsStore } from "../stores/useGraphicsStore";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import Graphic from "@arcgis/core/Graphic";

const useGraphics = () => {
  const { setGraphic, graphicsMap, removeGraphic } = useGraphicsStore();

  const symbol = new PointSymbol3D({
    symbolLayers: [
      {
        type: "icon",
        size: 10,
        anchor: "bottom",
        material: {
          color: [14, 230, 8, 1],
        },
        resource: {
          href: "https://static.arcgis.com/arcgis/styleItems/Icons/web/resource/Bus.svg",
        },
      },
    ],
  });

  const buildBusGraphics = (busPoint: BusTrip) => {
    const { latitude, longitude } = busPoint.getCurrentLocation();

    const point = new Point({
      latitude,
      longitude,
      z: 5,
    });

    return new Graphic({ geometry: point, symbol });
  };

  const createBusGraphics = (busData: BusTrip[]) => {
    busData.forEach((bus) => {
      const busGraphic = buildBusGraphics(bus);
      setGraphic(bus.id, busGraphic);
    });
  };

  const destroyBusGraphics = (busData: BusTrip[]) => {
    graphicsMap.forEach((_, key) => {
      const exists = busData.some((bus) => bus.id === key);
      if (!exists) {
        removeGraphic(key);
      }
    });
  };

  return { createBusGraphics, destroyBusGraphics, buildBusGraphics };
};

export default useGraphics;
