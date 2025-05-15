import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import BusTrip from "../domain/BusTrip";
import { WebSceneViewHandle } from "../components/WebSceneView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { TrafficFeature } from "@gdn/shared";
import useGraphics from "./useGraphics";

const useWebScene = (ref: RefObject<WebSceneViewHandle | null>) => {
  const webSceneRef = ref.current?.getView();
  const mountedBusRef = ref.current?.getBusGraphics();
  const mountedTrafficRef = ref.current?.getTrafficGraphics();
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isStationary, setIsStationary] = useState(true);
  const { buildBusGraphics } = useGraphics();

  useLayoutEffect(() => {
    (async () => {
      const ready = await ref.current?.isReady();
      if (ready) {
        setIsSceneLoaded(true);
      }
    })();
  }, [ref.current?.isReady()]);

  useEffect(() => {
    webSceneRef?.watch("stationary", (isStationary) => {
      setIsStationary(isStationary);
    });
  });

  const updateBusPositions = async (busTripData: BusTrip[]) => {
    if (!isSceneLoaded || !mountedBusRef) return;
    if (busTripData.length > 0) {
      try {
        busTripData.forEach((busPoint) => {
          const { id } = busPoint;
          const { latitude, longitude } = busPoint.getCurrentLocation();

          const point = new Point({
            latitude,
            longitude,
            z: 5,
          });

          if (mountedBusRef[id]) {
            mountedBusRef[id].geometry = point;
          } else {
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

            const graphic = new Graphic({ geometry: point, symbol });
            mountedBusRef[id] = graphic;
            webSceneRef?.graphics.add(graphic);
          }
        });

        Object.keys(mountedBusRef).forEach((busId) => {
          const busExists = busTripData.some((bus) => bus.id === busId);
          if (!busExists) {
            webSceneRef?.graphics.remove(mountedBusRef[busId]);
            delete mountedBusRef[busId];
          }
        });
      } catch (error) {
        console.error("Erro ao atualizar posições dos ônibus:", error);
      }
    }
  };

  const updateTrafficLines = async (TrafficLines: TrafficFeature[]) => {
    if (!isSceneLoaded || !mountedTrafficRef) return;
    if (TrafficLines.length > 0) {
      try {
        TrafficLines.forEach((TL) => {
          const { attributes } = TL;
          const stringID = attributes.li_id.toString();

          const polyline = new Polyline({
            paths: TL.geometry.paths,
            spatialReference: { wkid: 4326 },
          });

          if (mountedTrafficRef[stringID]) {
            mountedTrafficRef[stringID].geometry = polyline;
          } else {
            const lineSymbol = new SimpleLineSymbol({
              color: [255, 0, 0],
              width: 3,
            });

            const polylineGraphic = new Graphic({
              geometry: polyline,
              symbol: lineSymbol,
            });

            mountedTrafficRef[stringID] = polylineGraphic;
            webSceneRef?.graphics.add(polylineGraphic);
          }
        });

        Object.keys(mountedTrafficRef).forEach((tlId) => {
          const tlExists = TrafficLines.map((newTL) => newTL.attributes).some(
            (traffic) => traffic.li_id.toString() === tlId
          );
          if (!tlExists) {
            webSceneRef?.graphics.remove(mountedTrafficRef[tlId]);
            delete mountedTrafficRef[tlId];
          }
        });
      } catch (error) {
        console.error("Erro ao atualizar linhas de trânsito:", error);
      }
    }
  };

  const updateVisibleGraphics = (busData: BusTrip[]) => {
    if (!isSceneLoaded) return;

    const visibleExtent = webSceneRef!.extent;

    const visibleItems = busData.filter((item) => {
      const busPos = item.getCurrentLocation();
      const point = new Point({
        longitude: busPos.longitude,
        latitude: busPos.latitude,
      });
      return visibleExtent.contains(point);
    });

    webSceneRef?.graphics.removeAll();
    visibleItems.forEach((item) => {
      const graphic = buildBusGraphics(item);
      if (graphic) {
        webSceneRef?.graphics.add(graphic);
      }
    });
  };

  return {
    isSceneLoaded,
    isStationary,
    updateBusPositions,
    updateTrafficLines,
    updateVisibleGraphics,
  };
};

export default useWebScene;
