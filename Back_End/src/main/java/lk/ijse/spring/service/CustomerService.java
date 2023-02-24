package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);

    void updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer (String nic);

    CustomerDTO getCustomerDetail(String nic);

    List<CustomerDTO> getAllCustomerDetail();

    List<CustomerDTO> getTodayRegisteredCustomers();

    void uploadCustomerImages(String imageLocation, String nic);

    CustomerDTO searchCustomerByEmail(String email);
}
