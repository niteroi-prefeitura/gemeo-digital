import {
  SingleTripSchema,
  TripLocationSchema,
  TripBusInfoSchema,
} from "../src/schemas/busSchema";

describe("TripLocationSchema", () => {
  it("valida localização válida", () => {
    const result = TripLocationSchema.safeParse({
      latitude: -22.89,
      longitude: -43.12,
      angle: 180,
    });
    expect(result.success).toBe(true);
  });
});

describe("TripBusInfoSchema", () => {
  it("valida com todos os campos como null", () => {
    const result = TripBusInfoSchema.safeParse({
      consortium: null,
      busLine: null,
      busLineName: null,
      headsign: null,
      shapeId: null,
    });
    expect(result.success).toBe(true);
  });

  it("valida com valores preenchidos", () => {
    const result = TripBusInfoSchema.safeParse({
      consortium: "TransNit",
      busLine: "41JB",
      busLineName: "Venda da Cruz x Terminal",
      headsign: "Niteroi",
      shapeId: "shape-001",
    });
    expect(result.success).toBe(true);
  });

  it("falha com número no campo string", () => {
    const result = TripBusInfoSchema.safeParse({
      consortium: 123,
      busLine: null,
      busLineName: null,
      headsign: null,
      shapeId: null,
    });
    expect(result.success).toBe(false);
  });
});

describe("SingleTripSchema", () => {
  it("valida um trip completo válido", () => {
    const result = SingleTripSchema.safeParse({
      id: "1214395_U_6_0",
      routeId: "29940",
      destination: "Centro",
      currentLocation: {
        latitude: -22.88,
        longitude: -43.11,
        angle: 135,
      },
      busInfo: {
        consortium: "TransNit",
        busLine: "41JB",
        busLineName: "Venda da Cruz x Terminal",
        headsign: "Niteroi",
        shapeId: "shape-001",
      },
    });
    expect(result.success).toBe(true);
  });

  it("falha com id ausente", () => {
    const result = SingleTripSchema.safeParse({
      routeId: "29940",
      destination: "Centro",
      currentLocation: {
        latitude: -22.88,
        longitude: -43.11,
        angle: 135,
      },
      busInfo: {
        consortium: "TransNit",
        busLine: "41JB",
        busLineName: "Venda da Cruz x Terminal",
        headsign: "Niteroi",
        shapeId: "shape-001",
      },
    });
    expect(result.success).toBe(false);
  });

  it("falha com localização inválida", () => {
    const result = SingleTripSchema.safeParse({
      id: "1214395_U_6_0",
      routeId: "29940",
      destination: null,
      currentLocation: {
        latitude: "invalid",
        longitude: -43.11,
        angle: 135,
      },
      busInfo: {
        consortium: null,
        busLine: null,
        busLineName: null,
        headsign: null,
        shapeId: null,
      },
    });
    expect(result.success).toBe(false);
  });
});
