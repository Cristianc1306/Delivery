package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.ArticuloService;
import unpsjb.labprog.backend.model.Articulo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("articulos")
public class ArticuloPresenter {

  @Autowired
  ArticuloService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody Articulo articulo) {

    return Response.ok(
        service.save(articulo),
        "articulo creado correctamente");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Articulo articulo) {

    if (articulo.getId() == 0) {
      return Response.error(
          " Articulo actualizado no correctamente");
    }
    return Response.ok(
        service.save(articulo),
        "Stock actualizado correctamente");
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Articulo aArticulo = service.findById(id);
    return (aArticulo != null) ? Response.ok(aArticulo) : Response.notFound();
  }

  @RequestMapping(value = "/{code}", method = RequestMethod.GET)
  public ResponseEntity<Object> findByCode(@PathVariable("code") int code) {
    Articulo aArticuloOrNull = service.findByCode(code);
    return (aArticuloOrNull != null) ? Response.ok(aArticuloOrNull, "Articulo recuperado correctamente")
        : Response.notFound("Articulo no existe");
  }

  @RequestMapping(value = "/{code}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("code") int code) {
    Articulo aArticulo = service.findByCode(code);
    if (aArticulo == null) {
      return Response.notFound("Articulo no existe");
    }
    aArticulo.setEliminado(true);

    return Response.ok(service.save(aArticulo), "Articulo eliminado correctamente");
  }

  @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@PathVariable("term") String term) {
    return Response.ok(service.search(term));
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "term", required = false) String term,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) {

    return Response.ok(service.FindByPage(service.search(term), page, size));
  }
}
