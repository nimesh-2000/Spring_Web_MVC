package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/car")
@RestController
public class CarController {

    @Autowired
    CarService service;
    @PostMapping
    public ResponseUtil saveCar(@RequestBody CarDTO dto){
        service.saveCar(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }
}
