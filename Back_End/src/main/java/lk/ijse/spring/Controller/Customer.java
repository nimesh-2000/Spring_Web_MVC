package lk.ijse.spring.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RequestMapping("/customer")
@RestController
public class Customer {

    @GetMapping
    public String get(){
        System.out.println("uwani");
        return "me";
    }
}
