const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const jd = require("json-diff");
const request = require("sync-request");
const deleteKey = require("key-del");

Given(
  "que existen los siguientes artículos pedidos de pedidos anteriores a la fecha {string} sin remito aún",
  function (fecha, dataTable) {}
);
When(
  "solicito generar remitos para pedidos con fecha {string}",
  function (string) {
    const fecha = new Date(string);
    this.fecha = fecha.toISOString().slice(0, 10);
    let res = request(
      "GET",
      `http://backend:8080/remitos/generar?fecha=${this.fecha}`
    );
    this.remitos = JSON.parse(res.body, "utf8").data;
  }
);

Then("se obtiene los siguientes resultado:", function (docString) {
  let remitosData = JSON.parse(docString);

  this.remitos.forEach(function (remito) {
    remito.articulosPedido = remito.articulosPedido.sort((a, b) =>
      a.id.toString().localeCompare(b.id.toString())
    );
  });

  remitosData = deleteKey(remitosData, ["remito"]);
  this.remitos = deleteKey(this.remitos, [
    "id",
    "pedido",
    "remito",
    "factura",
    "total",
    "descripcion",
    "stock",
    "unidadMedida",
    "eliminado",
    "domicilios",
    "fechaDeBaja",
    "localidad",
  ]);

  return assert.strictEqual(undefined, jd.diff(remitosData, this.remitos));
});

Given("el artículo {string}", function (string) {
  let res = request("GET", "http://backend:8080/articulos/" + string);
  this.articulo = JSON.parse(res.body, "utf8").data;
});

When("actualizo el stock en {int}", function (int) {
  this.articulo.stock = this.articulo.stock + int;
  let res = request("PUT", "http://backend:8080/articulos", {
    json: this.articulo,
  });
  this.response = JSON.parse(res.body, "utf8");
  this.response.message =
    '{"Status Code": ' +
    this.response.status +
    ',"Status Text": "' +
    this.response.message +
    '","data":{"articulo": ' +
    this.response.data.codigo +
    ',"stock": ' +
    this.response.data.stock +
    "}}";
});

Then("se obtiene el siguiente resultado {string}", function (string) {
  return assert.equal(this.response.message, string);
});
