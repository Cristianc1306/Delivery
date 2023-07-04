# language: es
Característica: Nuevo pedido

Esquema del escenario: Cargar nuevo pedido a cliente que existe con domicilio ya registrado
   Dado que llama el cliente existente con nombre "<Nombre>" y con cuit "<cuit>"
   Y que solicita se envíe el pedido al domicilio existente en la localidad "<Localidad>" calle "<Calle>" y altura "<Altura>"
   Y que pide los siguientes artículos
      | Articulo | Nombre                | Cantidad  | PrecioUnitario  |
      | 1000     | remache corto         | 10        | 2.3             |
      | 1001     | remache mediano       | 40        | 3.1             |
      | 2000     | tornillo largo        | 125       | 3.4             |
      | 3000     | lija 0.5              | 6         | 0.45            |
      | 3001     | lija 1                | 10        | 0.77            |
      | 4000     | pintura blanca x 4lts | 1         | 390             |
   Cuando guarda el nuevo pedido con fecha de hoy
   Entonces obtiene la siguiente respuesta "<Respuesta>"

   Ejemplos:
   | Nombre        | cuit     | Localidad     | Calle      | Altura| Respuesta                       |
   | Juan Perez    | 10100100 | Trelew        | San Martín | 130   | Pedido cargado con éxito        |
   | Juan Perez    | 10100100 | Trelew        | Belgrano   | 100   | Pedido cargado con éxito        |
   | Raul Iriarte  | 20200200 | Puerto Madryn | Roca       | 200   | Pedido cargado con éxito        |
   | Raul Iriarte  | 20200200 | Puerto Madryn | Roca       | 200   | Pedido cargado con éxito        |
   | Rosana Lirios | 30300300 | Puerto Madryn | Maiz       | 300   | Pedido cargado con éxito        |
   | Marta Ríos    | 40400400 | Rawson        | Maiz       | 400   | Pedido cargado con éxito        |
   | José Quintana | 50500500 | Puerto Madryn | Sarmiento  | 500   | Pedido cargado con éxito        |
   | Laura Agosto  | 80800800 | Puerto Madryn | Bvd. Brown | 800   | Pedido cargado con éxito        |
   | Martín Burla  | 90900900 | Puerto Madryn | Chiquichan | 900   | Pedido cargado con éxito        |
   | Pedro Villa   | 11001000 | Trelew        | Yrigoyen   | 1000  | Pedido cargado con éxito        |

   Esquema del escenario: Cargar nuevo pedido a cliente o domicilio que no existe 
   Dado que llama la el cliente que no existe con nombre "<Nombre>" con y con cuit "<cuit>"
   Y que solicita se envíe el pedido al domicilio que no existe con localidad "<Localidad>" calle "<Calle>" y altura "<Altura>"
   Y que pide los siguientes artículos
      | Articulo| Nombre                | Cantidad  | PrecioUnitario  |
      | 5000    | Machimbre 10mm        | 20        | 355.25          |
      | 6000    | Aceite de lino x 4lts | 1         | 450.10          |

   Cuando guarda el nuevo pedido con fecha de hoy
   Entonces obtiene la siguiente respuesta "<Respuesta>"

   Ejemplos:
   | Nombre         | cuit     | Localidad     | Calle      | Altura| Respuesta                                      |
   | Juan Perez     | 60600600 | Puerto Madryn | Av. Gales  | 600   | Cliente Juan Perez cuit 60600600 no existe     |
   | Dora Barrancos | 70700700 | Puerto Madryn | Mitre      | 700   | Cliente Dora Barrancos cuit 70700700 no existe |
   | Laura Agosto   | 80800800 | Puerto Madryn | Roca       | 850   | Domicilio Roca 850 no existe para el cliente   |


   Esquema del escenario: nuevo clientes con domicilios
      Dado que existe el cliente con "<nombre>" y "<cuit>"
      Y que se ingresa "<calle>", "<altura>", "<pisoDpto>" y "<localidad>"
      Cuando presiono el botón de guardar domicilio
      Entonces se genera el registro en la DB con el nuevo domicilio para "<nombre>" y "<cuit>"

   Ejemplos:
   | nombre        | cuit     | calle      | altura| pisoDpto | localidad                       |
   | Juan Perez     | 60600600 | Av. Gales  | 600   | 2º A     | Puerto Madryn             |
   | Dora Barrancos | 70700700 | Mitre      | 700   |          | Puerto Madryn             |
   | Laura Agosto   | 80800800 | Roca       | 850   |          | Puerto Madryn             |

   Esquema del escenario: Cargar nuevo pedido a cliente que existe con domicilio ya registrado
   Dado que llama el cliente existente con nombre "<Nombre>" y con cuit "<cuit>"
   Y que solicita se envíe el pedido al domicilio existente en la localidad "<Localidad>" calle "<Calle>" y altura "<Altura>"
   Y que pide los siguientes artículos

      | Articulo| Nombre                | Cantidad  | PrecioUnitario  |
      | 5000    | Machimbre 10mm        | 20        | 355.25          |
      | 6000    | Aceite de lino x 4lts | 1         | 450.10          |

   Cuando guarda el nuevo pedido con fecha de hoy
   Entonces obtiene la siguiente respuesta "<Respuesta>"

   Ejemplos:
   | Nombre         | cuit     | Localidad     | Calle      | Altura| Respuesta                       |
   | Juan Perez     | 60600600 | Puerto Madryn | Av. Gales  | 600   | Pedido cargado con éxito        |
   | Dora Barrancos | 70700700 | Puerto Madryn | Mitre      | 700   | Pedido cargado con éxito        |
   | Laura Agosto   | 80800800 | Puerto Madryn | Roca       | 850   | Pedido cargado con éxito        |


