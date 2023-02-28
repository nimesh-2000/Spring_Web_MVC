package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/driver")
@RestController
public class DriverController {
    @Autowired
    DriverService service;
    @PostMapping
    public ResponseUtil saveDriver(@RequestBody DriverDTO dto){
        service.saveDriver(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }

    @GetMapping(params = "drivingLicenceNum")
    public ResponseUtil checkDriver(String drivingLicenceNum) {
        System.out.println(drivingLicenceNum);
        DriverDTO driverDTO = service.searchDriverByLicense(drivingLicenceNum);
        System.out.println(driverDTO);
        return new ResponseUtil("200", "Login Success", driverDTO);
    }
}
