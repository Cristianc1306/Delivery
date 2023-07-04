package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Articulo;

@Service
public class ArticuloService {

    @Autowired
    ArticuloRepository repository;

    public List<Articulo> findAll() {
        List<Articulo> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Articulo findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Articulo findByCode(int code) {
        return repository.findByCode(code).orElse(null);
    }

    @Transactional
    public Articulo save(Articulo aArticulo) {
        return repository.save(aArticulo);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    public List<Articulo> search(String term) {
        return repository.search("%" + term + "%");
    }

    public Page<Articulo> FindByPage(List<Articulo> remitos, int page, int size) {
        int start = page * size;
        int end = Math.min(start + size, remitos.size());
        Page<Articulo> remitosPage = new PageImpl<>(remitos.subList(start, end), PageRequest.of(page, size),
                remitos.size());
        return remitosPage;
    }
}
