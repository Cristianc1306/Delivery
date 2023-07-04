# language: es

Característica: Nuevo cliente

   Esquema del escenario: Sin domicilios
      Dado que se ingresa el cliente con "<nombre>" y "<cuit>"
      Cuando presiono el botón de guardar
      Entonces se genera el registro en la DB con "<nombre>" y "<cuit>"

      Ejemplos:
      | nombre   | cuit     |
      | Juan Perez    | 10100100 | 
      | Raul Iriarte  | 20200200 |
      | Rosana Lirios | 30300300 |
      | Marta Ríos    | 40400400 |
      | José Quintana | 50500500 |


   Esquema del escenario: Agregar domicilios a clientes existentes
      Dado que existe el cliente con "<nombre>" y "<cuit>"
      Y que se ingresa "<calle>", "<altura>", "<pisoDpto>" y "<localidad>"
      Cuando presiono el botón de guardar domicilio
      Entonces se genera el registro en la DB con el nuevo domicilio para "<nombre>" y "<cuit>"

      Ejemplos:
   | nombre        | cuit     | calle      | altura| pisoDpto | localidad                       |
   | Juan Perez    | 10100100 | San Martín | 130   |          | Trelew                    |
   | Juan Perez    | 10100100 | Belgrano   | 100   |          | Trelew                    |
   | Raul Iriarte  | 20200200 | Roca       | 200   | 1º A     | Puerto Madryn             |
   | Raul Iriarte  | 20200200 | Roca       | 100   |          | Puerto Madryn             |
   | Rosana Lirios | 30300300 | Maiz       | 300   | 3º B     | Puerto Madryn             |
   | Marta Ríos    | 40400400 | Maiz       | 400   |          | Rawson                    | 
   | José Quintana | 50500500 | Sarmiento  | 500   |          | Puerto Madryn             |

   Esquema del escenario: nuevo clientes con domicilios
      Dado que existe el cliente con "<nombre>" y "<cuit>"
      Y que se ingresa "<calle>", "<altura>", "<pisoDpto>" y "<localidad>"
      Cuando presiono el botón de guardar domicilio
      Entonces se genera el registro en la DB con el nuevo domicilio para "<nombre>" y "<cuit>"

      Ejemplos:
   | nombre        | cuit     | calle      | altura| pisoDpto | localidad                       |
   | Laura Agosto  | 80800800 | Bvd. Brown | 800   | 1º A     | Puerto Madryn             |
   | Laura Agosto  | 80800800 | Gales      | 1200  |          | Puerto Madryn             |
   | Martín Burla  | 90900900 | Chiquichan | 900   |          | Puerto Madryn             |
   | Pedro Villa   | 11001000 | Yrigoyen   | 1000  |          | Trelew                    |



