package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.DTOs.CuentaCorrienteDTO;
import unpsjb.labprog.backend.model.Cliente;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository repository;

    public List<Cliente> findAll() {
        List<Cliente> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Cliente findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Cliente findByCode(String cuit) {
        return repository.findByCode(cuit).orElse(null);
    }

    @Transactional
    public Cliente save(Cliente aCliente) {
        return repository.save(aCliente);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    public List<Cliente> search(String term) {
        return repository.search("%" + term + "%");
    }

    public List<Cliente> searchClientesActivos(String term) {
        return repository.searchClientesActivos("%" + term + "%");
    }

    public List<Cliente> searchHistorialClientes(String term, Date date, String cuit) {
        return repository.searchHistorialClientes("%" + term + "%", date, cuit);
    }

    public Page<Cliente> FindByPage(List<Cliente> clientes, int page, int size) {
        int start = page * size;
        int end = Math.min(start + size, clientes.size());
        Page<Cliente> clientesPage = new PageImpl<>(clientes.subList(start, end), PageRequest.of(page, size),
                clientes.size());
        return clientesPage;
    }

    public Page<CuentaCorrienteDTO> getDeudaClientes(int page, int size) {
        List<Object[]> resultados = repository.getDeudaClientes();

        List<CuentaCorrienteDTO> cuentasCorrientes = new ArrayList<>();

        int start = page * size;
        int end = Math.min((start + size), resultados.size());
        for (int i = start; i < end; i++) {
            Object[] resultado = resultados.get(i);
            Cliente cliente = (Cliente) resultado[0];
            Double deuda = (Double) resultado[1];
            CuentaCorrienteDTO dto = new CuentaCorrienteDTO(cliente, deuda);
            cuentasCorrientes.add(dto);
        }

        return new PageImpl<>(cuentasCorrientes, PageRequest.of(page, size), resultados.size());
    }
}