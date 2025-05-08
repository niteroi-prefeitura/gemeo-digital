export interface GPSLocation {
  latitude: number;
  longitude: number;
  angle: number;
  timestamp: Date;
}

interface BusData {
  consortium: string | null;
  busLine: string | null;
  busLineName: string | null;
  headsign: string | null;
  shapeId: string | null;
}

export interface BusTripProps {
  id: string;
  routeId: string;
  currentLocation: GPSLocation;
  destination: string | null;
  busInfo: BusData;
}

class BusTrip {
  public id: string;
  public routeId: string;
  private currentLocation: GPSLocation;
  private destination: string | null;
  private busInfo: BusData;

  constructor(data: BusTripProps) {
    this.id = data.id;
    this.routeId = data.routeId;
    this.currentLocation = data.currentLocation;
    this.destination = data.destination;
    this.busInfo = data.busInfo;
  }

  updateLocation(newLocation: GPSLocation) {
    this.currentLocation = newLocation;
  }

  getCurrentLocation(): GPSLocation {
    return this.currentLocation;
  }

  toJSON() {
    return {
      id: this.id,
      route: this.routeId,
      currentLocation: this.currentLocation,
      destination: this.destination,
      busInfo: this.busInfo,
    };
  }
}

export default BusTrip;
