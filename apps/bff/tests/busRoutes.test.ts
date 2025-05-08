import request from "supertest";
import app from "../src/server";
import * as busService from "../src/services/busDataService";

describe("GET /bus", () => {
  const mockData = {
    "99113": {
      tripId: "1214395_U_6_0",
      routeId: "29940",
      lat: -22.8856,
      lng: -43.1245,
      angle: 208.2,
      consorcio: "TransNit",
      linha: "41JB",
      nomeLinha: "VENDA DA CRUZ X TERMINAL - VIA JOAO BRASIL",
      headsign: "NITEROI",
      shapeId: null,
      sentido: "Ida",
    },
  };

  it("deve retornar 200 e os dados dos ônibus", async () => {
    jest.spyOn(busService, "getBusData").mockResolvedValue(mockData);

    const response = await request(app).get("/api/bus");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("deve retornar 500 se houver erro no serviço", async () => {
    jest.spyOn(busService, "getBusData").mockRejectedValue(new Error("Falha"));

    const response = await request(app).get("/api/bus");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});
