import React, { useEffect, useRef, useState } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import esriConfig from "@arcgis/core/config";

import "@arcgis/core/assets/esri/themes/light/main.css";
import BusTrip from "../domain/BusTrip";
import { TrafficFeature } from "@gdn/shared";

interface WebSceneViewProps {
  refreshInterval?: number;
  fetchBusTrips: () => Promise<boolean>;
  busTrips: BusTrip[];
  trafficFeatures: TrafficFeature[];
  fetchTraffic: () => Promise<boolean>;
}

const WebSceneView: React.FC<WebSceneViewProps> = ({
  refreshInterval = 10000,
  fetchBusTrips,
  busTrips,
  fetchTraffic,
  trafficFeatures,
}) => {
  const viewDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<SceneView | null>(null);
  const busGraphicsRef = useRef<Record<string, Graphic>>({});
  const tlGraphicsRef = useRef<Record<string, Graphic>>({});
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  //modifica objeto webscene
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

  const updateTrafficLines = async (TrafficLines: TrafficFeature[]) => {
    if (!isSceneLoaded) return;
    if (TrafficLines.length > 0) {
      try {
        TrafficLines.forEach((TL) => {
          const { attributes } = TL;
          const stringID = attributes.li_id.toString();

          const polyline = new Polyline({
            paths: TL.geometry.paths,
            spatialReference: { wkid: 4326 },
          });

          if (tlGraphicsRef.current[stringID]) {
            tlGraphicsRef.current[stringID].geometry = polyline;
          } else {
            const lineSymbol = new SimpleLineSymbol({
              color: [255, 0, 0],
              width: 3,
            });

            const polylineGraphic = new Graphic({
              geometry: polyline,
              symbol: lineSymbol,
              attributes: {
                nome: "Linha de Trânsito",
              },
              popupTemplate: {
                title: "{nome}",
                content: "Esta é a linha de trânsito exibida no mapa.",
              },
            });

            tlGraphicsRef.current[stringID] = polylineGraphic;
            viewRef.current?.graphics.add(polylineGraphic);
          }
        });

        Object.keys(tlGraphicsRef.current).forEach((tlId) => {
          const tlExists = TrafficLines.map((newTL) => newTL.attributes).some(
            (traffic) => traffic.li_id.toString() === tlId
          );
          if (!tlExists) {
            viewRef.current?.graphics.remove(tlGraphicsRef.current[tlId]);
            delete tlGraphicsRef.current[tlId];
          }
        });
      } catch (error) {
        console.error("Erro ao atualizar linhas de trânsito:", error);
      }
    }
  };

  //faz chamada a api
  const updateWrapper = async () => {
    await fetchBusTrips();
    await fetchTraffic();
  };

  //observa mudanças de estado e construção de componentes para chamar atualização de onibus
  useEffect(() => {
    updateBusPositions(busTrips);
    updateTrafficLines(trafficFeatures);
  }, [busTrips, trafficFeatures]);

  //monta objeto webscene
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
          latitude: -22.9071,
          longitude: -43.1258,
          z: 1100,
        },
        tilt: 55,
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
