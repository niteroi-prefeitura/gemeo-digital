import WebSceneView from "./components/WebSceneView";
import useBusTrip from "./hooks/useBusTrip";

function App() {
  const { fetchBusData, busTrips } = useBusTrip();

  return <WebSceneView fetchBusTrips={fetchBusData} busTrips={busTrips} />;
}

export default App;
