import React, { useEffect, useRef, useState } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import esriConfig from "@arcgis/core/config";

import "@arcgis/core/assets/esri/themes/light/main.css";
import BusTrip from "../domain/BusTrip";

interface WebSceneViewProps {
  refreshInterval?: number;
  fetchBusTrips: () => Promise<boolean>;
  busTrips: BusTrip[];
}

const WebSceneView: React.FC<WebSceneViewProps> = ({
  refreshInterval = 10000,
  fetchBusTrips,
  busTrips,
}) => {
  const viewDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<SceneView | null>(null);
  const busGraphicsRef = useRef<Record<string, Graphic>>({});
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  const updateBusPositions = async (busTripData: BusTrip[]) => {
    if (!isSceneLoaded) return;
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

          if (busGraphicsRef.current[id]) {
            busGraphicsRef.current[id].geometry = point;
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
            busGraphicsRef.current[id] = graphic;
            viewRef.current?.graphics.add(graphic);
          }
        });

        Object.keys(busGraphicsRef.current).forEach((busId) => {
          const busExists = busTripData.some((bus) => bus.id === busId);
          if (!busExists) {
            viewRef.current?.graphics.remove(busGraphicsRef.current[busId]);
            delete busGraphicsRef.current[busId];
          }
        });
      } catch (error) {
        console.error("Erro ao atualizar posições dos ônibus:", error);
      }
    }
  };

  const updateWrapper = async () => {
    console.log("fetching...");
    await fetchBusTrips();
  };

  useEffect(() => {
    updateBusPositions(busTrips);
  }, [busTrips]);

  useEffect(() => {
    esriConfig.portalUrl = "https://sig.niteroi.rj.gov.br/portal";
    const scene = new WebScene({
      portalItem: {
        id: "d4d8e30c1f984346a67b1feba7fd3e6e",
      },
    });

    const view = new SceneView({
      container: viewDiv.current as HTMLDivElement,
      map: scene,
      camera: {
        position: {
          latitude: -22.8934,
          longitude: -43.1225,
          z: 200,
        },
        tilt: 65,
      },
    });

    viewRef.current = view;

    view.when(() => {
      setIsSceneLoaded(true);

      updateWrapper();

      const intervalId = setInterval(updateWrapper, refreshInterval);

      return () => clearInterval(intervalId);
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, [refreshInterval]);

  return <div ref={viewDiv} style={{ height: "100vh", width: "100%" }} />;
};

export default WebSceneView;
