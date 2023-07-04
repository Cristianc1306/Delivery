const assert = require("assert");
const { Given, When, Then, BeforeAll, AfterAll } = require("cucumber");
const request = require("sync-request");

BeforeAll(function () {
  let resA = request("GET", "http://backend:8080/articulospedidos");
  let responseA = JSON.parse(resA.body, "utf8");
  this.articulosF = responseA.data;

  this.articulosF.forEach((articulosPedido) =>
    request(
      "DELETE",
      "http://backend:8080/articulospedidos/" + articulosPedido.id
    )
  );

  let resP = request("GET", "http://backend:8080/pedidos");
  let responseP = JSON.parse(resP.body, "utf8");
  this.pedidosF = responseP.data;

  this.pedidosF.forEach((pedido) =>
    request("DELETE", "http://backend:8080/pedidos/" + pedido.id)
  );

  let resF = request("GET", "http://backend:8080/facturas");
  let responseF = JSON.parse(resF.body, "utf8");
  this.facturasF = responseF.data;

  this.facturasF.forEach((factura) =>
    request("DELETE", "http://backend:8080/facturas/" + factura.id)
  );

  let resR = request("GET", "http://backend:8080/remitos");
  let responseR = JSON.parse(resR.body, "utf8");
  this.remitosF = responseR.data;

  this.remitosF.forEach((remito) =>
    request("DELETE", "http://backend:8080/remitos/" + remito.id)
  );

  let resD = request("GET", "http://backend:8080/domicilios");
  let responseD = JSON.parse(resD.body, "utf8");
  this.domiciliosF = responseD.data;

  let res = request("GET", "http://backend:8080/clientes");
  let response = JSON.parse(res.body, "utf8");
  this.clientesF = response.data;

  this.clientesF.forEach((cliente) =>
    request("DELETE", "http://backend:8080/clientes/f/" + cliente.cuit)
  );
  this.domiciliosF.forEach((cliente) =>
    request("DELETE", "http://backend:8080/domicilios/" + cliente.id)
  );

  let resAA = request("GET", "http://backend:8080/articulos");
  this.articulos = JSON.parse(resAA.body, "utf8").data;
  //para no cargar los datos a mano
  if (this.articulos.length === 0) {
    let articulos = [];
    let articulo = {
      codigo: 1000,
      nombre: "remache corto",
      descripcion: "remache corto",
      unidadMedida: "un",
      precio: 2.3,
      stock: 0,
    };
    articulos.push(articulo);
    let articulo2 = {
      codigo: 1001,
      nombre: "remache mediado",
      descripcion: "remache mediado",
      unidadMedida: "un",
      precio: 3.1,
      stock: 0,
    };
    articulos.push(articulo2);
    let articulo3 = {
      codigo: 2000,
      nombre: "tornillo largo",
      descripcion: "tornillo largo",
      unidadMedida: "un",
      precio: 3.4,
      stock: 0,
    };
    articulos.push(articulo3);

    let articulo4 = {
      codigo: 3000,
      nombre: "lija 0.5 ",
      descripcion: "lija 0.5 ",
      unidadMedida: "un",
      precio: 0.45,
      stock: 0,
    };
    articulos.push(articulo4);

    let articulo5 = {
      codigo: 3001,
      nombre: "lija 1",
      descripcion: "lija 1",
      unidadMedida: "un",
      precio: 0.77,
      stock: 0,
    };
    articulos.push(articulo5);

    let articulo6 = {
      codigo: 4000,
      nombre: "pintura blanca x 4lts",
      descripcion: "pintura blanca x 4lts",
      unidadMedida: "un",
      precio: 390,
      stock: 0,
    };
    articulos.push(articulo6);

    let articulo7 = {
      codigo: 5000,
      nombre: "Machimbre 10m ",
      descripcion: "Machimbre 10m ",
      unidadMedida: "un",
      precio: 355.25,
      stock: 0,
    };
    articulos.push(articulo7);

    let articulo8 = {
      codigo: 6000,
      nombre: "Aceite de lino x 4lts",
      descripcion: "Aceite de lino x 4lts ",
      unidadMedida: "un",
      precio: 450.1,
      stock: 0,
    };
    articulos.push(articulo8);

    articulos.forEach((articulo) => {
      request("POST", "http://backend:8080/articulos", {
        json: articulo,
      });
    });

    let resAAA = request("GET", "http://backend:8080/articulos");
    this.articulos = JSON.parse(resAAA.body, "utf8").data;
  }
  this.articulos.forEach((articulo) => {
    if (articulo.codigo === 1000) {
      articulo.stock = 65;
    }
    if (articulo.codigo === 1001) {
      articulo.stock = 750;
    }
    if (articulo.codigo === 2000) {
      articulo.stock = 1522;
    }
    if (articulo.codigo === 3000) {
      articulo.stock = 35;
    }
    if (articulo.codigo === 3001) {
      articulo.stock = 100;
    }
    if (articulo.codigo === 4000) {
      articulo.stock = 4;
    }
    if (articulo.codigo === 5000) {
      articulo.stock = 15;
    }
    if (articulo.codigo === 6000) {
      articulo.stock = 7;
    }
    request("PUT", "http://backend:8080/articulos", {
      json: articulo,
    });
  });
});

AfterAll(function () {});

Given(
  "que se ingresa el cliente con {string} y {string}",
  function (nombre, cuit) {
    this.cliente = {
      name: nombre,
      cuit: cuit,
    };
  }
);
Given("que existe el cliente con {string} y {string}", function (nombre, cuit) {
  let res = request("GET", "http://backend:8080/clientes/" + cuit);
  this.aCliente = JSON.parse(res.body, "utf8").data;
  this.domicilios = [];
  if (this.aCliente == null) {
    let cliente = {
      name: nombre,
      cuit: cuit,
      domicilios: this.domicilios,
    };

    res = request("POST", "http://backend:8080/clientes", {
      json: cliente,
    });

    this.aCliente = JSON.parse(res.body, "utf8").data;
  }
});

Given(
  "que se ingresa {string}, {string}, {string} y {string}",
  function (calle, altura, pisoDpto, localidad) {
    //cargar localidades con el archivo localidadesSQL
    let resL = request(
      "GET",
      "http://backend:8080/localidades/search/" + localidad
    );
    this.localidades = JSON.parse(resL.body, "utf8").data;
    this.domicilios = this.aCliente.domicilios;
    this.domicilio = {
      calle: calle,
      altura: altura,
      pisoDpto: pisoDpto,
      localidad: this.localidades[0],
    };
  }
);

When("presiono el botón de guardar domicilio", function () {
  this.domicilios.push(this.domicilio);
  this.aCliente.domicilios = this.domicilios;
  let res = request("PUT", "http://backend:8080/clientes", {
    json: this.aCliente,
  });

  this.response = JSON.parse(res.body, "utf8");
});

When("presiono el botón de guardar", function () {
  let res = request("POST", "http://backend:8080/clientes", {
    json: this.cliente,
  });

  this.response = JSON.parse(res.body, "utf8");
});

Then(
  "se genera el registro en la DB con {string} y {string}",
  function (name, cuit) {
    if (this.response.status == 200) {
      assert.equal(this.response.data.cuit, cuit);
      assert.equal(this.response.data.name, name);
    }

    return true;
  }
);

Then(
  "se genera el registro en la DB con el nuevo domicilio para {string} y {string}",
  function (name, cuit) {
    if (this.response.status == 200) {
      assert.equal(this.response.data.cuit, cuit);
      assert.equal(this.response.data.name, name);
    }

    return true;
  }
);
