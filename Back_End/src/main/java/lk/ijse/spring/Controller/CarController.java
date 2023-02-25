package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

@CrossOrigin
@RequestMapping("/car")
@RestController
public class CarController {

    @Autowired
    CarService service;
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO carDTO){
        service.saveCar(carDTO);
        return new ResponseUtil("200",carDTO.toString()+ " Added",null);
    }

    @PutMapping(path = "/uploadImg/{registrationId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("image_1") MultipartFile image_1, @RequestPart("image_2") MultipartFile image_2, @RequestPart("image_3") MultipartFile image_3, @RequestPart("image_4") MultipartFile image_4, @PathVariable String registrationId) {
        try {

            String projectPath = String.valueOf(new File("F:\\uploadImage\\uploads"));
            File uploadsDir = new File(projectPath + "\\CarImage");
            uploadsDir.mkdir();

            image_1.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_1.getOriginalFilename()));
            image_2.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_2.getOriginalFilename()));
            image_3.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_3.getOriginalFilename()));
            image_4.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_4.getOriginalFilename()));

            String carFrontViewPath = projectPath + "\\CarImage" + image_1.getOriginalFilename();
            String carBackViewPath = projectPath + "\\CarImage" + image_2.getOriginalFilename();
            String carSideViewPath = projectPath + "\\CarImage" + image_3.getOriginalFilename();
            String carInteriorViewPath = projectPath + "\\CarImage" + image_4.getOriginalFilename();

            service.uploadCarImages(carFrontViewPath, carBackViewPath, carSideViewPath, carInteriorViewPath, registrationId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }
    @GetMapping
    public ResponseUtil getAllCars(){
        ArrayList<CarDTO> allCars = service.getAllCarDetail();
        return new ResponseUtil("200"," Success",allCars);
    }


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCar(@RequestBody CarDTO dto){
        service.updateCar(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }
}
