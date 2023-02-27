package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/admin")
@RestController
public class AdminController {
    @Autowired
    AdminService service;
    @PostMapping
    public ResponseUtil saveAdmin(@RequestBody AdminDTO dto){
        service.saveAdmin(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }
    @GetMapping(params = "email")
    public ResponseUtil checkAdmin(String email) {
        System.out.println(email);
        AdminDTO adminDTO = service.searchAdminByEmail(email);
        System.out.println(adminDTO);
        return new ResponseUtil("200", "Login Success", adminDTO);
    }
}
