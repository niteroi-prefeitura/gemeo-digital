---
id: endpoints
title: Endpoints e Estrutura de Resposta
sidebar_position: 4
---

# Endpoints da API

Esta seção detalha os endpoints REST expostos pelo backend da aplicação de gêmeo digital. Todos os endpoints respondem em **JSON** com dados geográficos e contextuais simplificados para serem consumidos pelo front-end.

---

## Considerações Técnicas
- Todos os endpoints suportam cache interno, controlado por tempo de expiração.
- Os dados são tratados para remover atributos desnecessários antes de serem enviados ao front.
- O middleware de erro registra falhas com Winston, permitindo auditoria e manutenção.

## Próximos Passos
- Incluir filtragem geográfica.
- Retornar metadados como para controle de integridade dos dados.

## Resumo dos Endpoints

| Endpoint        | Descrição                              | Origem dos Dados         | Cache           |
|-----------------|----------------------------------------|---------------------------|------------------|
| `/api/bus`      | Dados de localização e status de ônibus | API externa               | 30 segundos      |
| `/api/alerts`   | Alertas de trânsito                    | Camada ArcGIS própria     | 2 minutos        |
| `/api/traffic`  | Fluxo de trânsito por segmento viário  | Camada ArcGIS própria     | 5 minutos        |

## `/api/bus`

### Descrição
Retorna a localização atual e informações sobre a linha dos ônibus monitorados na cidade.

### Fonte dos dados
API externa pública fornecida pela MobNit.

### Cache
30 segundos

### Estrutura de Resposta

```json
[
		{
		"id": "1209015_U_50_0",
		"routeId": "32587",
		"currentLocation": {
			"latitude": -22.89092254638672,
			"longitude": -43.125179290771484,
			"angle": 280.3048400878906,
			"timestamp": "2025-05-12T19:10:11.596Z"
		},
		"destination": "ida",
		"busInfo": {
			"consortium": "transnit",
			"busLine": "30",
			"busLineName": "martins torres",
			"headsign": "terminal",
			"shapeId": "75279_I"
		}
	},
]
```

## `/api/alerts`

### Descrição
Retorna alertas ativos de trânsito (obras, acidentes, bloqueios, etc.).

### Fonte dos dados
Camada ArcGIS própria com dados de alertas de mobilidade originados da plataforma waze.

### Cache
2 minutos

### Estrutura de Resposta

```json
[
  {
		"attributes": {
			"OBJECTID": 32152,
			"tx_uuid": "5d08ef61-ad05-4b9a-a263-0cd81bccc63b",
			"tx_rua": "R. Venâncio Flores",
			"tx_tipo_via": "Rua",
			"tx_tipo_alerta": "Perigo",
			"tx_subtipo_alerta": "Buraco",
			"tx_informe_municipal": false,
			"dt_data_hora": 1747082645026,
			"dt_entrada": 1746903867416,
			"dt_saida": null,
			"db_lat": -22.885837,
			"db_long": -42.988003,
			"li_avaliacao_informe": 0,
			"li_confianca": 5,
			"li_confiabilidade": 10,
			"li_direcao_graus": 35
		},
		"geometry": {
			"x": -42.988003,
			"y": -22.885837
		}
	},
]
```

## `/api/traffic`

### Descrição
Retorna informações em tempo real sobre o fluxo do trânsito em diferentes trechos da cidade.

### Fonte dos dados
Camada ArcGIS com dados de mobilidade e intensidade de tráfego.

### Cache
5 minutos

### Estrutura de Resposta

```json
[
  {
		"attributes": {
			"OBJECTID": 919298,
			"tx_uuid": "681096346",
			"tx_pais": "BR",
			"tx_cidade": "Niterói",
			"tx_tipo_via": "Rua principal",
			"tx_rua": "Av. Prof. João Brasil",
			"li_comprimento": 568,
			"tx_final": "R. Capitão Dalvo Rabello Sampaio",
			"db_velocidade_kmh": 15.02,
			"db_velocidade": 4.1722222222222225,
			"li_atraso": 84,
			"li_nivel": 3,
			"li_id": 681096346,
			"dt_data_hora": 1747082645038,
			"Shape__Length": 0.005273132679789844
		},
		"geometry": {
			"paths": [
				[
					[
						-43.101642,
						-22.8808650006766
					],
					[
						-43.101524,
						-22.8808460006766
					],
					[
						-43.101462,
						-22.8808250006766
					],
					[
						-43.101421,
						-22.8807940006766
					],
					[
						-43.101359,
						-22.8806920006766
					],
					[
						-43.10132,
						-22.8805700006766
					],
					[
						-43.101245,
						-22.8803350006766
					],
					[
						-43.100944,
						-22.8794070006765
					],
					[
						-43.100776,
						-22.8789320006765
					],
					[
						-43.100729,
						-22.8788220006765
					],
					[
						-43.100621,
						-22.8786370006765
					],
					[
						-43.10048,
						-22.8784540006765
					],
					[
						-43.100348,
						-22.8783190006765
					],
					[
						-43.099763,
						-22.8778450006765
					],
					[
						-43.098533,
						-22.8768910006765
					]
				]
			]
		}
	},
]
```