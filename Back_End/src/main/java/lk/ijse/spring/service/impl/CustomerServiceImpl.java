package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (repo.existsById(customerDTO.getNic())){
            throw new RuntimeException("Customer "+customerDTO.getNic()+" Already Exist..!");
        }
        Customer entity = mapper.map(customerDTO, Customer.class);
        repo.save(entity);
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        if (!repo.existsById(customerDTO.getNic())){
            throw new RuntimeException("Customer "+customerDTO.getNic()+" Not Available to Update..!");
        }
        Customer entity = mapper.map(customerDTO, Customer.class);
        repo.save(entity);
    }

    @Override
    public void deleteCustomer(String nic) {
        if (!repo.existsById(nic)){
            throw new RuntimeException("Customer "+nic+" Not Available to Delete..!");
        }
        repo.deleteById(nic);
    }

    @Override
    public CustomerDTO getCustomerDetail(String nic) {
        return null;
    }

    @Override
    public List<CustomerDTO> getAllCustomerDetail() {
        return mapper.map(repo.findAll(),new TypeToken<List<CustomerDTO>>(){}.getType());
    }

    @Override
    public List<CustomerDTO> getTodayRegisteredCustomers() {
        return null;
    }
}
