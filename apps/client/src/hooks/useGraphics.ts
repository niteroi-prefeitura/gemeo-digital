import Point from "@arcgis/core/geometry/Point";
import BusTrip from "../domain/BusTrip";
import { useGraphicsStore } from "../stores/useGraphicsStore";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import Graphic from "@arcgis/core/Graphic";
import SceneView from "@arcgis/core/views/SceneView";

const useGraphics = () => {
  const { setGraphic, removeGraphic, getGraphic } = useGraphicsStore();

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

  const pointGeometry = (lat: number, long: number) =>
    new Point({
      latitude: lat,
      longitude: long,
      z: 5,
    });

  const buildBusGraphics = (busPoint: BusTrip) => {
    const { latitude, longitude } = busPoint.getCurrentLocation();

    const point = pointGeometry(latitude, longitude);

    return new Graphic({ geometry: point, symbol });
  };

  const createBusGraphics = (busData: BusTrip[], view: SceneView) => {
    busData.map((bus) => {
      const existingGraphic = getGraphic(bus.id);
      if (existingGraphic) {
        const { latitude, longitude } = bus.getCurrentLocation();
        existingGraphic.geometry = pointGeometry(latitude, longitude);
        return;
      }
      const busGraphic = buildBusGraphics(bus);
      setGraphic(bus.id, busGraphic);
      view?.graphics.add(busGraphic);
    });
  };

  const destroyBusGraphics = (busData: BusTrip[], view: SceneView) => {
    busData.map((bus) => {
      const graphicToRemove = getGraphic(bus.id);
      if (graphicToRemove) {
        removeGraphic(bus.id);
        view?.graphics.remove(graphicToRemove);
      }
    });
  };

  return {
    createBusGraphics,
    destroyBusGraphics,
    buildBusGraphics,
  };
};

export default useGraphics;
