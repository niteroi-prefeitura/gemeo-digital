import WebSceneView from "./components/WebSceneView";
import useBusTrip from "./hooks/useBusTrip";
import useTraffic from "./hooks/useTraffic";
import "./style.css";

function App() {
  const { fetchBusData, busTrips } = useBusTrip();
  const { fetchTrafficData, trafficData } = useTraffic();

  return (
    <WebSceneView
      fetchBusTrips={fetchBusData}
      busTrips={busTrips}
      trafficFeatures={trafficData}
      fetchTraffic={fetchTrafficData}
    />
  );
}

export default App;
