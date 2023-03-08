package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @GetMapping(params = "availability")
    public ResponseUtil checkDriverAvailability(String availability) {
        System.out.println(availability);
        DriverDTO driverDTO = service.searchDriverByAvailability(availability);
        return new ResponseUtil("200", "Success", driverDTO);
    }

    @GetMapping(path = "/randomDriver",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverRandom(){
        DriverDTO driverDTO = service.generateDriver();
        return new ResponseUtil("200","OK",driverDTO);
    }
    @PutMapping(path = "/updateNonAvailable/{driverID}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateDriverStatus(@PathVariable String driverID, @PathVariable String status) {
        service.updateDriverRentStatus(driverID, status);
        return new ResponseUtil("200", "Done", null);
    }

    @GetMapping(path = "/generateDriverId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateDriverId() {
        String s = service.generateDriverId();
        return new ResponseUtil("200", "Ok", s);
    }

}
