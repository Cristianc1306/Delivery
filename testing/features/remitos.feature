# language: es
Característica: generar remitos
   módulo que genera remitos busando pedidos pendients de genereción para una fecha

Escenario: generar remitos con fecha "14-05-2023" quedando algunos artículos pendientes por falta de stock
   Dado que existen los siguientes artículos pedidos de pedidos anteriores a la fecha "2023-05-31" sin remito aún
   | Pedido | FechaPedido | Cliente | Domicilio | Articulo | Cantidad | Precio | Stock | 
   | 1      | 2020-05-12  | 1000    | 1001      | 1000     | 10       | 2.3    | 65    |
   | 1      | 2020-05-12  | 1000    | 1001      | 1001     | 40       | 3.1    | 750   |
   | 1      | 2020-05-12  | 1000    | 1001      | 2000     | 125      | 3.4    | 1522  |
   | 1      | 2020-05-12  | 1000    | 1001      | 3000     | 6        | 0.45   | 35    |
   | 1      | 2020-05-12  | 1000    | 1001      | 3001     | 10       | 0.77   | 100   |
   | 1      | 2020-05-12  | 1000    | 1001      | 4000     | 1        | 390    | 4     |
   | 2      | 2020-05-12  | 1000    | 1002      | 1000     | 10       | 2.3    | 65    |
   | 2      | 2020-05-12  | 1000    | 1002      | 1001     | 40       | 3.1    | 750   |
   | 2      | 2020-05-12  | 1000    | 1002      | 2000     | 125      | 3.4    | 1522  |
   | 2      | 2020-05-12  | 1000    | 1002      | 3000     | 6        | 0.45   | 35    |
   | 2      | 2020-05-12  | 1000    | 1002      | 3001     | 10       | 0.77   | 100   |
   | 2      | 2020-05-12  | 1000    | 1002      | 4000     | 1        | 390    | 4     |
   | 3      | 2020-05-12  | 2000    | 2001      | 1000     | 10       | 2.3    | 65    |
   | 3      | 2020-05-12  | 2000    | 2001      | 1001     | 40       | 3.1    | 750   |
   | 3      | 2020-05-12  | 2000    | 2001      | 2000     | 125      | 3.4    | 1522  |
   | 3      | 2020-05-12  | 2000    | 2001      | 3000     | 6        | 0.45   | 35    |
   | 3      | 2020-05-12  | 2000    | 2001      | 3001     | 10       | 0.77   | 100   |
   | 3      | 2020-05-12  | 2000    | 2001      | 4000     | 1        | 390    | 4     |
   | 4      | 2020-05-12  | 2000    | 2001      | 1000     | 10       | 2.3    | 65    |
   | 4      | 2020-05-12  | 2000    | 2001      | 1001     | 40       | 3.1    | 750   |
   | 4      | 2020-05-12  | 2000    | 2001      | 2000     | 125      | 3.4    | 1522  |
   | 4      | 2020-05-12  | 2000    | 2001      | 3000     | 6        | 0.45   | 35    |
   | 4      | 2020-05-12  | 2000    | 2001      | 3001     | 10       | 0.77   | 100   |
   | 4      | 2020-05-12  | 2000    | 2001      | 4000     | 1        | 390    | 4     |
   | 5      | 2020-05-12  | 3000    | 3001      | 1000     | 10       | 2.3    | 65    |
   | 5      | 2020-05-12  | 3000    | 3001      | 1001     | 40       | 3.1    | 750   |
   | 5      | 2020-05-12  | 3000    | 3001      | 2000     | 125      | 3.4    | 1522  |
   | 5      | 2020-05-12  | 3000    | 3001      | 3000     | 6        | 0.45   | 35    |
   | 5      | 2020-05-12  | 3000    | 3001      | 3001     | 10       | 0.77   | 100   |
   | 5      | 2020-05-12  | 3000    | 3001      | 4000     | 1        | 390    | 4     |
   | 6      | 2020-05-12  | 4000    | 4001      | 1000     | 10       | 2.3    | 65    |
   | 6      | 2020-05-12  | 4000    | 4001      | 1001     | 40       | 3.1    | 750   |
   | 6      | 2020-05-12  | 4000    | 4001      | 2000     | 125      | 3.4    | 1522  |
   | 6      | 2020-05-12  | 4000    | 4001      | 3000     | 6        | 0.45   | 35    |
   | 6      | 2020-05-12  | 4000    | 4001      | 3001     | 10       | 0.77   | 100   |
   | 6      | 2020-05-12  | 4000    | 4001      | 4000     | 1        | 390    | 4     |
   | 7      | 2020-05-12  | 5000    | 5002      | 1000     | 10       | 2.3    | 65    |
   | 7      | 2020-05-12  | 5000    | 5002      | 1001     | 40       | 3.1    | 750   |
   | 7      | 2020-05-12  | 5000    | 5002      | 2000     | 125      | 3.4    | 1522  |
   | 7      | 2020-05-12  | 5000    | 5002      | 3000     | 6        | 0.45   | 35    |
   | 7      | 2020-05-12  | 5000    | 5002      | 3001     | 10       | 0.77   | 100   |
   | 7      | 2020-05-12  | 5000    | 5002      | 4000     | 1        | 390    | 4     |

   Cuando solicito generar remitos para pedidos con fecha "2023-05-31"
   Entonces se obtiene los siguientes resultado:
   """
   [
        {   
            "remito": 1,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "San Martín", "altura": "130", "pisoDpto": "" },
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
                }
            ]
        },
        {   
            "remito": 2,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Belgrano", "altura": "100", "pisoDpto": "" },
            "cliente": { "cuit": "10100100", "name": "Juan Perez" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000,  "nombre": "remache corto", "precio": 2.3 }
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
            ]
        },
        {   
            "remito": 3,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Roca", "altura": "200", "pisoDpto": "1º A" },
            "cliente": { "cuit": "20200200", "name": "Raul Iriarte"
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
            ]
        },
        {   
            "remito": 4,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Maiz", "altura": "300", "pisoDpto": "3º B" },
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
                }
            ]
        },
        {   
            "remito": 5,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Maiz", "altura": "400", "pisoDpto": "" },
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
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77
                    }
                }
            ]
        },
        {  
            "remito": 6,
            "fechaArmado": "2023-05-31T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Sarmiento", "altura": "500", "pisoDpto": "" },
            "cliente": { "cuit": "50500500", "name": "José Quintana" },
            "articulosPedido": [
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
            ]
        }
    ]
   """
   
   Escenario: generar remitos con fecha "2020-05-16" quedando algunos artículos pendientes por falta de stock
   Dado que existen los siguientes artículos pedidos de pedidos anteriores a la fecha "2023-06-01" sin remito aún
   | Pedido | FechaPedido | Cliente | Domicilio | Articulo | Cantidad | Precio | Stock | 
   | 10     | 2020-05-15  | 8000    | 8001      | 1000     | 10       | 2.3    | 65    |
   | 10     | 2020-05-15  | 8000    | 8001      | 1001     | 40       | 3.1    | 750   |
   | 10     | 2020-05-15  | 8000    | 8001      | 2000     | 125      | 3.4    | 1522  |
   | 10     | 2020-05-15  | 8000    | 8001      | 3000     | 6        | 0.45   | 35    |
   | 10     | 2020-05-15  | 8000    | 8001      | 3001     | 10       | 0.77   | 100   |
   | 10     | 2020-05-15  | 8000    | 8001      | 4000     | 1        | 390    | 4     |
   | 11     | 2020-05-15  | 9000    | 9002      | 1000     | 10       | 2.3    | 65    |
   | 11     | 2020-05-15  | 9000    | 9002      | 1001     | 40       | 3.1    | 750   |
   | 11     | 2020-05-15  | 9000    | 9002      | 2000     | 125      | 3.4    | 1522  |
   | 11     | 2020-05-15  | 9000    | 9002      | 3000     | 6        | 0.45   | 35    |
   | 11     | 2020-05-15  | 9000    | 9002      | 3001     | 10       | 0.77   | 100   |
   | 11     | 2020-05-15  | 9000    | 9002      | 4000     | 1        | 390    | 4     |
   | 12     | 2020-05-15  | 10000   | 10001     | 1000     | 10       | 2.3    | 65    |
   | 12     | 2020-05-15  | 10000   | 10001     | 1001     | 40       | 3.1    | 750   |
   | 12     | 2020-05-15  | 10000   | 10001     | 2000     | 125      | 3.4    | 1522  |
   | 12     | 2020-05-15  | 10000   | 10001     | 3000     | 6        | 0.45   | 35    |
   | 12     | 2020-05-15  | 10000   | 10001     | 3001     | 10       | 0.77   | 100   |
   | 12     | 2020-05-15  | 10000   | 10001     | 4000     | 1        | 390    | 4     |
   | 8      | 2020-05-14  | 6000    | 6001      | 5000     | 20       | 355.25 | 15    |
   | 8      | 2020-05-14  | 6000    | 6001      | 6000     | 1        | 450.10 | 7     |
   | 9      | 2020-05-14  | 7000    | 7001      | 5000     | 20       | 355.25 | 15    |
   | 9      | 2020-05-14  | 7000    | 7001      | 6000     | 1        | 450.10 | 7     |
   | 13     | 2020-05-14  | 8000    | 8003      | 5000     | 20       | 355.25 | 15    |
   | 13     | 2020-05-14  | 8000    | 8003      | 6000     | 1        | 450.10 | 7     |


   Cuando solicito generar remitos para pedidos con fecha "2023-06-01"
   Entonces se obtiene los siguientes resultado:
   
   """
    [
        {   
            "remito": 7,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Bvd. Brown", "altura": "800", "pisoDpto": "1º A" },
            "cliente": { "cuit": "80800800", "name": "Laura Agosto" },
            "articulosPedido": [
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
            ]
        },
        {
            "remito": 8,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Chiquichan", "altura": "900", "pisoDpto": "" },
            "cliente": { "cuit": "90900900", "name": "Martín Burla" },
            "articulosPedido": [
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
            ]
        },
        {
            "remito": 9,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Yrigoyen", "altura": "1000", "pisoDpto": "" },
            "cliente": { "cuit": "11001000", "name": "Pedro Villa" },
            "articulosPedido": [
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
                    "cantidad": 10,
                    "precio": 7.7,
                    "articulo": { "codigo": 3001, "nombre": "lija 1", "precio": 0.77
                    }
                }
            ]
        },
        {
            "remito": 10,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Av. Gales", "altura": "600", "pisoDpto": "2º A" },
            "cliente": { "cuit": "60600600", "name": "Juan Perez" },
            "articulosPedido": [
                {
                    "cantidad": 1,
                    "precio": 450.1,
                    "articulo": { "codigo": 6000, "nombre": "Aceite de lino x 4lts", "precio": 450.1 }
                }
            ]
        },
        {
            "remito": 11,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Mitre", "altura": "700", "pisoDpto": "" },
            "cliente": { "cuit": "70700700", "name": "Dora Barrancos" },
            "articulosPedido": [
                {
                    "cantidad": 1,
                    "precio": 450.1,
                    "articulo": { "codigo": 6000, "nombre": "Aceite de lino x 4lts", "precio": 450.1 }
                }
            ]
        },
        {
            "remito": 12,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Roca", "altura": "850", "pisoDpto": "" },
            "cliente": { "cuit": "80800800", "name": "Laura Agosto" },
            "articulosPedido": [
                {
                    "cantidad": 1,
                    "precio": 450.1,
                    "articulo": { "codigo": 6000, "nombre": "Aceite de lino x 4lts", "precio": 450.1 }
                }
            ]
        }
    ]
   """

   Esquema del escenario: Actualiza stock faltante
   Dado el artículo "<Articulo>"
   Cuando actualizo el stock en <Cantidad>
   Entonces se obtiene el siguiente resultado <Resultado>

   Ejemplos:
   | Articulo | Cantidad | Resultado |
   | 1000     | 35       | "{\"Status Code\": 200,\"Status Text\": \"Stock actualizado correctamente\",\"data\":{\"articulo\": 1000,\"stock\": 40}}" |
   | 3000     | 32       | "{\"Status Code\": 200,\"Status Text\": \"Stock actualizado correctamente\",\"data\":{\"articulo\": 3000,\"stock\": 37}}" |
   | 4000     | 50       | "{\"Status Code\": 200,\"Status Text\": \"Stock actualizado correctamente\",\"data\":{\"articulo\": 4000,\"stock\": 50}}" |
   | 5000     | 50       | "{\"Status Code\": 200,\"Status Text\": \"Stock actualizado correctamente\",\"data\":{\"articulo\": 5000,\"stock\": 65}}" |   


  Escenario: generar remitos con fecha "2020-05-16" luego de stock renovado
   Dado que existen los siguientes artículos pedidos de pedidos anteriores a la fecha "2023-06-01" sin remito aún
   | Pedido | FechaPedido | Cliente | Domicilio | Articulo | Cantidad | Precio | Stock | 
   | 5      | 2020-05-12  | 3000    | 3001      | 4000     | 1        | 390    | 40    |
   | 6      | 2020-05-12  | 4000    | 4001      | 3000     | 6        | 0.45   | 17    |
   | 6      | 2020-05-12  | 4000    | 4001      | 4000     | 1        | 390    | 50    |
   | 7      | 2020-05-12  | 5000    | 5002      | 1000     | 10       | 2.3    | 40    |
   | 7      | 2020-05-12  | 5000    | 5002      | 3000     | 6        | 0.45   | 17    |
   | 7      | 2020-05-12  | 5000    | 5002      | 4000     | 1        | 390    | 50    |
   | 10     | 2020-05-15  | 8000    | 8001      | 1000     | 10       | 2.3    | 65    |
   | 10     | 2020-05-15  | 8000    | 8001      | 3000     | 6        | 0.45   | 35    |
   | 10     | 2020-05-15  | 8000    | 8001      | 4000     | 1        | 390    | 4     |
   | 11     | 2020-05-15  | 9000    | 9002      | 1000     | 10       | 2.3    | 65    |
   | 11     | 2020-05-15  | 9000    | 9002      | 3000     | 6        | 0.45   | 35    |
   | 11     | 2020-05-15  | 9000    | 9002      | 4000     | 1        | 390    | 4     |
   | 12     | 2020-05-15  | 10000   | 10001     | 1000     | 10       | 2.3    | 65    |
   | 12     | 2020-05-15  | 10000   | 10001     | 3000     | 6        | 0.45   | 35    |
   | 12     | 2020-05-15  | 10000   | 10001     | 4000     | 1        | 390    | 4     | 
   | 8      | 2020-05-14  | 6000    | 6001      | 5000     | 20       | 355.25 | 65    |
   | 9      | 2020-05-14  | 7000    | 7001      | 5000     | 20       | 355.25 | 65    |
   | 13     | 2020-05-14  | 8000    | 8003      | 5000     | 20       | 355.25 | 15    |


   Cuando solicito generar remitos para pedidos con fecha "2023-06-01"
   Entonces se obtiene los siguientes resultado:
   """
    [
        {
            "remito": 13,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Maiz", "altura": "300", "pisoDpto": "3º B" },
            "cliente": { "cuit": "30300300", "name": "Rosana Lirios" },
            "articulosPedido": [
                {
                    "cantidad": 1,
                    "precio": 390.0,
                    "articulo": { "codigo": 4000, "nombre": "pintura blanca x 4lts", "precio": 390.0 }
                }
            ]
        },
        {
            "remito": 14,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Maiz", "altura": "400", "pisoDpto": "" },
            "cliente": { "cuit": "40400400", "name": "Marta Ríos" },
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
            ]
        },
        {
            "remito": 15,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Sarmiento", "altura": "500", "pisoDpto": "" },
            "cliente": { "cuit": "50500500", "name": "José Quintana" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
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
            ]
        },
        {
            "remito": 16,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Bvd. Brown", "altura": "800", "pisoDpto": "1º A" },
            "cliente": { "cuit": "80800800", "name": "Laura Agosto" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
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
            ]
        },
        {
            "remito": 17,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Chiquichan", "altura": "900", "pisoDpto": "" },
            "cliente": { "cuit": "90900900", "name": "Martín Burla" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
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
            ]
        },
        {
            "remito": 18,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Yrigoyen", "altura": "1000", "pisoDpto": "" },
            "cliente": { "cuit": "11001000", "name": "Pedro Villa" },
            "articulosPedido": [
                {
                    "cantidad": 10,
                    "precio": 23.0,
                    "articulo": { "codigo": 1000, "nombre": "remache corto", "precio": 2.3 }
                },
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
            ]
        },
        {
            "remito": 19,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Av. Gales", "altura": "600", "pisoDpto": "2º A" },
            "cliente": { "cuit": "60600600", "name": "Juan Perez" },
            "articulosPedido": [
                {
                    "cantidad": 20,
                    "precio": 7105.0,
                    "articulo": { "codigo": 5000, "nombre": "Machimbre 10m ", "precio": 355.25 }
                }
            ]
        },
        {
            "remito": 20,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Mitre", "altura": "700", "pisoDpto": "" },
            "cliente": { "cuit": "70700700", "name": "Dora Barrancos" },
            "articulosPedido": [
                {
                    "cantidad": 20,
                    "precio": 7105.0,
                    "articulo": { "codigo": 5000, "nombre": "Machimbre 10m ", "precio": 355.25 }
                }
            ]
        },
        {
            "remito": 21,
            "fechaArmado": "2023-06-01T00:00:00.000+00:00",
            "entregado": false,
            "domicilio": { "calle": "Roca", "altura": "850", "pisoDpto": "" },
            "cliente": { "cuit": "80800800", "name": "Laura Agosto" },
            "articulosPedido": [
                {
                    "cantidad": 20,
                    "precio": 7105.0,
                    "articulo": { "codigo": 5000, "nombre": "Machimbre 10m ", "precio": 355.25 }
                }
            ]
        }
    ]
   """
