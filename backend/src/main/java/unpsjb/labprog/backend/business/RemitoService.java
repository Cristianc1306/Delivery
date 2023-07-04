package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Remito;

@Service
public class RemitoService {

    @Autowired
    RemitoRepository repository;

    public List<Remito> findAll() {
        List<Remito> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Remito findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Remito save(Remito remito) {
        return repository.save(remito);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    public List<Remito> search(String term, Boolean entregado, Date date, String facturado, String cuit) {
        return repository.search("%" + term + "%", entregado, date, facturado, cuit);
    }

}