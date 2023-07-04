package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Pedido;

@Service
public class PedidoService {

    @Autowired
    PedidoRepository repository;

    public List<Pedido> findAll() {
        List<Pedido> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Pedido findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Pedido save(Pedido aPedido) {
        return repository.save(aPedido);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    public List<Pedido> search(String term, Date date, String estado, String cuit) {
        return repository.search("%" + term + "%", date, estado, cuit);
    }
}