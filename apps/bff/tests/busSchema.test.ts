import { BusMapSchema } from "../src/schemas/busSchema";

describe("BusMapSchema", () => {
  it("valida com sucesso um objeto de ônibus único correto", () => {
    const validData = {
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

    expect(() => BusMapSchema.parse(validData)).not.toThrow();
  });

  it("valida com sucesso múltiplos ônibus válidos", () => {
    const multipleValidData = {
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
      "99114": {
        tripId: "1214396_U_6_1",
        routeId: "29941",
        lat: -22.89,
        lng: -43.12,
        angle: 45.0,
        consorcio: "TransOceânica",
        linha: "42A",
        nomeLinha: "ICARAÍ X CENTRO",
        headsign: "CENTRO",
        shapeId: null,
        sentido: "Volta",
      },
    };

    expect(() => BusMapSchema.parse(multipleValidData)).not.toThrow();
  });

  it("falha se lat for uma string em um dos ônibus", () => {
    const invalidData = {
      "99113": {
        tripId: "1214395_U_6_0",
        routeId: "29940",
        lat: "-22.8856", // inválido
        lng: -43.1245,
        angle: 208.2,
        consorcio: "TransNit",
        linha: "41JB",
        nomeLinha: "VENDA DA CRUZ X TERMINAL - VIA JOAO BRASIL",
        headsign: "NITEROI",
        shapeId: null,
        sentido: "Ida",
      },
      "99114": {
        tripId: "1214396_U_6_1",
        routeId: "29941",
        lat: -22.89,
        lng: -43.12,
        angle: 45.0,
        consorcio: "TransOceânica",
        linha: "42A",
        nomeLinha: "ICARAÍ X CENTRO",
        headsign: "CENTRO",
        shapeId: null,
        sentido: "Volta",
      },
    };

    expect(() => BusMapSchema.parse(invalidData)).toThrow();
  });

  it("falha se faltar um campo obrigatório em um dos ônibus", () => {
    const invalidData = {
      "99113": {
        routeId: "29940", // faltando tripId
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
      "99114": {
        tripId: "1214396_U_6_1",
        routeId: "29941",
        lat: -22.89,
        lng: -43.12,
        angle: 45.0,
        consorcio: "TransOceânica",
        linha: "42A",
        nomeLinha: "ICARAÍ X CENTRO",
        headsign: "CENTRO",
        shapeId: null,
        sentido: "Volta",
      },
    };

    expect(() => BusMapSchema.parse(invalidData)).toThrow();
  });
});
