package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.DTOs.RankingVentasDTO;
import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.model.Factura;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@Service
public class FacturaService {

    @Autowired
    FacturaRepository repository;

    public List<Factura> findAll() {
        List<Factura> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Factura findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Factura save(Factura factura) {
        return repository.save(factura);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    public Page<RankingVentasDTO> vendido(Date fechaInicio, Date fechaFin, int page, int size) {
        List<Object[]> resultados = repository.getTotalVendidoPorClienteEnPeriodo(fechaInicio, fechaFin);
        int start = page * size;
        int end = Math.min((start + size), resultados.size());

        List<RankingVentasDTO> vendido = new ArrayList<>();
        for (int i = start; i < end; i++) {
            Object[] resultado = resultados.get(i);
            Cliente cliente = (Cliente) resultado[0];
            Double total = (Double) resultado[1];
            RankingVentasDTO dto = new RankingVentasDTO(cliente, total);
            vendido.add(dto);
        }

        return new PageImpl<>(vendido, PageRequest.of(page, size), resultados.size());
    }

    public List<Factura> search(String term, Date date, String pagado, String cuit) {
        return repository.search("%" + term + "%", date, pagado, cuit);
    }
}