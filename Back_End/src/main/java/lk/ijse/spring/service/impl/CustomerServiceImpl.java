package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;

import java.util.List;

public class CustomerServiceImpl implements CustomerService {
    @Override
    public void saveCustomer(CustomerDTO customerDTO) {

    }

    @Override
    public String updateCustomer(CustomerDTO customerDTO) {
        return null;
    }

    @Override
    public void deleteCustomer(String id) {

    }

    @Override
    public CustomerDTO getCustomerDetail(String id) {
        return null;
    }

    @Override
    public List<CustomerDTO> getAllCustomerDetail() {
        return null;
    }

    @Override
    public List<CustomerDTO> getTodayRegisteredCustomers() {
        return null;
    }
}
