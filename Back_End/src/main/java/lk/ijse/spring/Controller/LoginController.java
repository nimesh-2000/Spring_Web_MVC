package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RequestMapping("/customerLogin")
@RestController
public class LoginController {

    @Autowired
    CustomerService service;

    @GetMapping(params = "email")
    public ResponseUtil checkCustomer(String email) {
        System.out.println(email);
        CustomerDTO customerDTO = service.searchCustomerByEmail(email);
        System.out.println(customerDTO);
        return new ResponseUtil("200", "Login Success", customerDTO);
    }
}
