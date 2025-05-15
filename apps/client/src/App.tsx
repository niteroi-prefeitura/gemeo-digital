import { useEffect, useRef } from "react";
import WebSceneView, { WebSceneViewHandle } from "./components/WebSceneView";
import useBusTrip from "./hooks/useBusTrip";
import useTraffic from "./hooks/useTraffic";
import "./style.css";
import useWebScene from "./hooks/useWebScene";

function App() {
  const mapRef = useRef<WebSceneViewHandle>(null);
  const {
    isSceneLoaded,
    updateVisibleGraphics,
    isStationary,
    updateTrafficLines,
  } = useWebScene(mapRef);
  const { fetchBusData, busTrips } = useBusTrip();
  const { fetchTrafficData, trafficData } = useTraffic();

  useEffect(() => {
    if (isSceneLoaded && isStationary) {
      updateVisibleGraphics(busTrips);
    }
  }, [busTrips, isSceneLoaded, isStationary]);

  useEffect(() => {
    if (isSceneLoaded) {
      updateTrafficLines(trafficData);
    }
  }, [trafficData, isSceneLoaded]);

  useEffect(() => {
    if (isSceneLoaded) {
      fetchBusData();
      fetchTrafficData();
      console.log("loaded");

      setInterval(fetchBusData, 10000);
    }
  }, [isSceneLoaded]);

  return <WebSceneView ref={mapRef} />;
}

export default App;
