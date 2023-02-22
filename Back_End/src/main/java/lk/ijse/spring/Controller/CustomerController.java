package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/customer")
@RestController
public class CustomerController {

    @Autowired
    CustomerService service;


    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto){
        service.saveCustomer(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        List<CustomerDTO> allCustomers = service.getAllCustomerDetail();
        return new ResponseUtil("200"," Success",allCustomers);
    }

    @DeleteMapping(params = "nic")
    public ResponseUtil deleteCustomer(String nic){
        service.deleteCustomer(nic);
        return new ResponseUtil("200",nic+" Deleted",null);
    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto){
        service.updateCustomer(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }
}
