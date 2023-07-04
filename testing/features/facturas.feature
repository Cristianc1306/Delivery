# language: es
Característica: Administrar de la Facturación
         proceso que emite facturas de remitos entregados no facturados aún

   Esquema del escenario:
      Dado el remito <remito> que no está entregado aún
      Cuando se marca como entregado al remito número <remito>
      Entonces se marca como entregado se obtiene <resultado>

      Ejemplos:
      | remito | resultado                                                                                            |
      | 1      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 1}}" |
      | 2      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 2}}" |
      | 4      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 4}}" |
      | 5      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 5}}" |
      | 6      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 6}}" |
      | 8      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 8}}" |
      | 9      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 9}}" |
      | 13     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 13}}" |
      | 15     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 15}}" |
      | 17     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 17}}" |
      | 18     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 18}}" |

   Escenario: 
    Dado los remitos entregados
    Cuando se solicita facturar
    Entonces se obtiente el siguiente resultado de facturación

    """
    [
        {
            "factura": 1,
            "cliente": { "cuit": "10100100", "name": "Juan Perez" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                },
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 1944.8
        },
        {
            "factura": 2,
            "cliente": { "cuit": "30300300", "name": "Rosana Lirios" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 972.4
        },
        {
            "factura": 3,
            "cliente": { "cuit": "40400400", "name": "Marta Ríos" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                }
            ],
            "total": 579.7
        },
        {
            "factura": 4,
            "cliente": { "cuit": "50500500", "name": "José Quintana" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 972.4
        },
        {
            "factura": 5,
            "cliente": { "cuit": "90900900", "name": "Martín Burla" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 972.4
        },
        {
            "factura": 6,
            "cliente": { "cuit": "11001000", "name": "Pedro Villa"
            },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 972.4
        }
    ]
    """

   Esquema del escenario:
      Dado el remito <remito> que no está entregado aún
      Cuando se marca como entregado al remito número <remito>
      Entonces se marca como entregado se obtiene <resultado>

      Ejemplos:
      | remito | resultado                                                                                            |
      | 3      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 3}}" |
      | 10     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 10}}" |
      | 11     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 11}}" |
      | 7      | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 7}}" |
      | 14     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 14}}" |
      | 19     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 19}}" |
      | 20     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 20}}" |
      | 16     | "{\"Status Code\": 200,\"Status Text\": \"Remito entregado correctamente\",\"data\":{\"remito\": 16}}" |

   Escenario: 
      Dado los remitos entregados
      Cuando se solicita facturar
      Entonces se obtiente el siguiente resultado de facturación
      """ 
      [
        {
            "factura": 7,
            "cliente": { "cuit": "20200200", "name": "Raul Iriarte" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                },
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4
                    }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77
                    }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 1944.8
        },
        {

            "factura": 8,
            "cliente": { "cuit": "40400400", "name": "Marta Ríos"
            },
            "articulosPedido": [
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 392.7
        },
        {
            "factura": 9,
            "cliente": { "cuit": "80800800", "name": "Laura Agosto" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
                {
                    "cantidad": 40,
                    "precio": 124.0,
                    "articulo": { "codigo": 1001, "nombre": "remache mediado", "precio": 3.1 }
                },
                {
                    "cantidad": 125,
                    "precio": 425.0,
                    "articulo": { "codigo": 2000, "nombre": "tornillo largo", "precio": 3.4 }
                },
                {
                    "cantidad": 6,
                    "precio": 2.7,
                    "articulo": { "codigo": 3000, "nombre": "lija 0.5 ", "precio": 0.45 }
                },
                {
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77 }
                },
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ],
            "total": 972.4
        },
        {
            "factura": 10,
            "cliente": { "cuit": "60600600", "name": "Juan Perez" },
            "articulosPedido": [
                {
                    "cantidad": 20,
                    "precio": 7105.0,
                    "articulo": { "codigo": 5000, "nombre": "Machimbre 10m ", "precio": 355.25 }
                },
                {
                    "cantidad": 1,
                    "precio": 450.1,
                    "articulo": { "codigo": 6000, "nombre": "Aceite de lino x 4lts", "precio": 450.1 }
                }
            ],
            "total": 7555.1
        },
        {
            "factura": 11,
            "cliente": { "cuit": "70700700", "name": "Dora Barrancos" },
            "articulosPedido": [
                {
                    "cantidad": 20,
                    "precio": 7105.0,
                    "articulo": { "codigo": 5000, "nombre": "Machimbre 10m ", "precio": 355.25 }
                },
                {
                    "cantidad": 1,
                    "precio": 450.1,
                    "articulo": { "codigo": 6000, "nombre": "Aceite de lino x 4lts", "precio": 450.1 }
                }
            ],
            "total": 7555.1
        }
    ]
    """

      Esquema del escenario:
      Dada la factura <factura> que no ha sido abonada aún
      Cuando la factura número <factura> se marca como abonada en la fecha "2023-05-21"
      Entonces se obtiene el siguiente <resultado> de facturas abonadas

      Ejemplos:
      | factura | resultado                                                                                            |
      | 1       | "{\"Status Code\": 200,\"Status Text\": \"Factura abonada correctamente\",\"data\":{\"factura\": 1}}" |
      | 2       | "{\"Status Code\": 200,\"Status Text\": \"Factura abonada correctamente\",\"data\":{\"factura\": 2}}" |
      | 3       | "{\"Status Code\": 200,\"Status Text\": \"Factura abonada correctamente\",\"data\":{\"factura\": 3}}" |
      | 5       | "{\"Status Code\": 200,\"Status Text\": \"Factura abonada correctamente\",\"data\":{\"factura\": 5}}" |
      | 10      | "{\"Status Code\": 200,\"Status Text\": \"Factura abonada correctamente\",\"data\":{\"factura\": 10}}" |
      | 13      | "{\"Status Code\": 500,\"Status Text\": \"la factura 13 no existe\",\"data\":{}}" |

