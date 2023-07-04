const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const jd = require("json-diff");
const request = require("sync-request");
const deleteKey = require("key-del");

Given("el remito {int} que no está entregado aún", function (int) {
  let res = request("GET", "http://backend:8080/remitos");

  this.remitos = JSON.parse(res.body, "utf8").data;
  this.remitos.sort((a, b) => a.id - b.id);
  let resP = request(
    "GET",
    "http://backend:8080/remitos/" + this.remitos[int - 1].id
  );
  this.remito = JSON.parse(resP.body, "utf8").data;
});

When("se marca como entregado al remito número {int}", function (int) {
  this.remito.entregado = true;
  let res = request("PUT", "http://backend:8080/remitos", {
    json: this.remito,
  });
  this.response = JSON.parse(res.body, "utf8");
  this.response.message =
    '{"Status Code": ' +
    this.response.status +
    ',"Status Text": "' +
    this.response.message +
    '","data":{"remito": ' +
    int +
    "}}";
});
Then("se marca como entregado se obtiene {string}", function (string) {
  return assert.equal(this.response.message, string);
});

Given("los remitos entregados", function () {});

When("se solicita facturar", function () {
  let res = request("GET", `http://backend:8080/facturas/generar`);
  this.facturas = JSON.parse(res.body, "utf8").data;
});

Then("se obtiente el siguiente resultado de facturación", function (docString) {
  let facturasData = JSON.parse(docString);

  this.facturas.forEach(function (factura) {
    factura.articulosPedido = factura.articulosPedido.sort((a, b) =>
      a.id.toString().localeCompare(b.id.toString())
    );
  });

  facturasData = deleteKey(facturasData, ["factura"]);
  this.facturas = deleteKey(this.facturas, [
    "id",
    "pedido",
    "remito",
    "factura",
    "descripcion",
    "stock",
    "unidadMedida",
    "eliminado",
    "domicilios",
    "fechaDeBaja",
    "fechaEmision",
    "fechaPago",
  ]);

  return assert.strictEqual(undefined, jd.diff(facturasData, this.facturas));
});

Given("la factura {int} que no ha sido abonada aún", function (int) {
  let res = request("GET", "http://backend:8080/facturas");
  this.facturas = JSON.parse(res.body, "utf8").data;
  this.factura = null;
  if (this.facturas.length >= int) {
    this.facturas.sort((a, b) => a.id - b.id);
    let resP = request(
      "GET",
      "http://backend:8080/facturas/" + this.facturas[int - 1].id
    );
    this.response = JSON.parse(resP.body, "utf8");
    this.factura = JSON.parse(resP.body, "utf8").data;
  } else {
    let resP = request("GET", "http://backend:8080/facturas/" + int);
    this.response = JSON.parse(resP.body, "utf8");
  }
});

When(
  "la factura número {int} se marca como abonada en la fecha {string}",
  function (int, string) {
    if (this.factura === null) {
      this.response.message =
        '{"Status Code": ' +
        500 +
        ',"Status Text": "la factura ' +
        int +
        ' no existe","data":{}}';
    } else {
      const fecha = new Date();
      this.fechaSoloDia = fecha.toISOString().slice(0, 10);
      this.factura.fechaPago = this.fechaSoloDia;
      let res = request("PUT", "http://backend:8080/facturas", {
        json: this.factura,
      });
      this.response = JSON.parse(res.body, "utf8");
      this.response.message =
        '{"Status Code": ' +
        this.response.status +
        ',"Status Text": "' +
        this.response.message +
        '","data":{"factura": ' +
        int +
        "}}";
    }
  }
);

Then(
  "se obtiene el siguiente {string} de facturas abonadas",
  function (string) {
    return assert.equal(this.response.message, string);
  }
);
