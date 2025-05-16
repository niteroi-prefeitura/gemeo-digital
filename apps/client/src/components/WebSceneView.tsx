import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";

import "@arcgis/core/assets/esri/themes/light/main.css";

export interface WebSceneViewHandle {
  getView: () => SceneView | null;
  getBusGraphics: () => Record<string, Graphic>;
  getTrafficGraphics: () => Record<string, Graphic>;
  isReady: () => Promise<boolean>;
}

const WebSceneView = forwardRef<WebSceneViewHandle>((_, ref) => {
  const viewDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<SceneView | null>(null);
  const busGraphicsRef = useRef<Record<string, Graphic>>({});
  const trafficGraphicsRef = useRef<Record<string, Graphic>>({});
  const viewReady = useRef<boolean>(null);

  esriConfig.portalUrl = "https://sig.niteroi.rj.gov.br/portal";

  const buildingsLayer = new SceneLayer({
    url: "https://tiles.arcgis.com/tiles/TpaOLI1HCh5AcRQB/arcgis/rest/services/Edifica%C3%A7%C3%B5es_SLPK_102100/SceneServer/layers/0",
    title: "Edificações 3D",
  });
  const scene = new WebScene({
    portalItem: {
      id: "7303de33e35f4a47b9dcf137766418b2",
    },
    layers: [buildingsLayer],
  });

  const initialCamConfig = {
    position: {
      latitude: -22.9071,
      longitude: -43.1258,
      z: 1100,
    },
    tilt: 55,
  };

  useEffect(() => {
    const view = new SceneView({
      container: viewDiv.current as HTMLDivElement,
      map: scene,
      camera: initialCamConfig,
      qualityProfile: "high",
    });

    viewRef.current = view;

    viewRef.current.when(() => (viewReady.current = true));
  }, []);

  useImperativeHandle(ref, () => ({
    getView: () => viewRef.current,
    getBusGraphics: () => busGraphicsRef.current,
    getTrafficGraphics: () => trafficGraphicsRef.current,
    isReady: async () => {
      if (viewRef) {
        return viewRef.current?.when(() => true);
      }
      return false;
    },
  }));

  return <div ref={viewDiv} style={{ height: "100vh", width: "100%" }} />;
});

export default WebSceneView;
