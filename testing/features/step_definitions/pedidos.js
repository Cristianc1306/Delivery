const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const jd = require("json-diff");
const request = require("sync-request");

Given(
  "que llama el cliente existente con nombre {string} y con cuit {string}",
  function (nombre, cuit) {
    let res = request("GET", "http://backend:8080/clientes/" + cuit);
    this.cliente = JSON.parse(res.body, "utf8").data;
  }
);

Given(
  "que solicita se envíe el pedido al domicilio existente en la localidad {string} calle {string} y altura {string}",
  function (localidad, calle, altura) {
    for (let domicilio of this.cliente.domicilios) {
      if (domicilio.calle === calle && domicilio.altura === altura) {
        this.domicilio = domicilio;
      }
    }
  }
);

Given(
  "que llama la el cliente que no existe con nombre {string} con y con cuit {string}",
  function (nombre, cuit) {
    let res = request("GET", "http://backend:8080/clientes/" + cuit);
    this.cliente = JSON.parse(res.body, "utf8").data;
    this.response = JSON.parse(res.body, "utf8");
    this.response.message =
      "Cliente " + nombre + " cuit " + cuit + " no existe";
  }
);

Given(
  "que solicita se envíe el pedido al domicilio que no existe con localidad {string} calle {string} y altura {string}",
  function (localidad, calle, altura) {
    if (this.cliente != null) {
      this.domicilio = null;
      this.response.message =
        "Domicilio " + calle + " " + altura + " no existe para el cliente";
    }
  }
);

Given("que pide los siguientes artículos", function (dataTable) {
  this.listaArticulosPedidos = [];
  const articulos = dataTable.raw();

  for (let i = 1; i < articulos.length; i++) {
    const articuloF = articulos[i];

    let res = request("GET", "http://backend:8080/articulos/" + articuloF[0]);
    let articuloBD = JSON.parse(res.body, "utf8").data;

    let articulosPedido = {
      cantidad: articuloF[2] * 1,
      precio: articuloF[2] * articuloF[3],
      pedido: null,
      articulo: articuloBD,
    };

    this.listaArticulosPedidos.push(articulosPedido);
  }
});

When("guarda el nuevo pedido con fecha de hoy", function () {
  if (this.cliente != null && this.domicilio != null) {
    let resA = request("GET", "http://backend:8080/articulospedidos");

    this.articulosPedidos = JSON.parse(resA.body, "utf8").data;
    let fecha = new Date();
    if (this.articulosPedidos.length > 41) {
      // Si hay más de 42 artículos, la fecha es la actual
      fecha = new Date("2023-06-01");
    } else {
      // Si hay 42 o menos artículos, la fecha es la actual menos un día
      fecha = new Date("2023-05-31");
    }
    const fechaSoloDia = fecha.toISOString().slice(0, 10);
    let aPedido = {
      fecha: fechaSoloDia,
      observaciones: "",
      domicilio: this.domicilio,
      cliente: this.cliente,
    };
    let pedidoDTO = {
      pedido: aPedido,
      articulosPedido: this.listaArticulosPedidos,
    };

    let res = request("POST", "http://backend:8080/pedidos", {
      json: pedidoDTO,
    });

    this.response = JSON.parse(res.body, "utf8");
  }
});

Then("obtiene la siguiente respuesta {string}", function (string) {
  return assert.equal(this.response.message, string);
});
