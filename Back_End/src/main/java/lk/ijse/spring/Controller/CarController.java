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
import java.net.URISyntaxException;
import java.util.ArrayList;

@CrossOrigin
@RequestMapping("/car")
@RestController
public class CarController {

   @Autowired
   CarService service;
@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
public ResponseUtil addVehicle(@RequestPart("vImageFile") MultipartFile[] file, @RequestPart("vehicle") CarDTO carDTO) {


    for (MultipartFile myFile : file) {

        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();
            myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
            System.out.println(projectPath);
        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            return new ResponseUtil("500", "Registration Failed.Try Again Latter", null);
        }
    }




    service.saveCar(carDTO);
    return new ResponseUtil("200", "Registration Successfully....", carDTO);
}

    @PostMapping(path = "/uploadImg/{registrationId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("image_1") MultipartFile image_1, @RequestPart("image_2") MultipartFile image_2, @RequestPart("image_3") MultipartFile image_3, @RequestPart("image_4") MultipartFile image_4, @PathVariable String registrationId) {
        try {


            System.out.println(image_1.getOriginalFilename());
            System.out.println("Upload Image");

            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();

            image_1.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_1.getOriginalFilename()));
            image_2.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_2.getOriginalFilename()));
            image_3.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_3.getOriginalFilename()));
            image_4.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_4.getOriginalFilename()));
            String carFrontViewPath = image_1.getOriginalFilename();
            String carBackViewPath = image_2.getOriginalFilename();
            String carSideViewPath = image_3.getOriginalFilename();
            String carInteriorViewPath = image_4.getOriginalFilename();

            service.uploadCarImages(carFrontViewPath, carBackViewPath, carSideViewPath, carInteriorViewPath, registrationId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500", e.getMessage(), null);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping
    public ResponseUtil getAllCars(){
        ArrayList<CarDTO> allCars = service.getAllCarDetail();
        return new ResponseUtil("200"," Success",allCars);
    }


    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO dto){
        service.updateCar(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }

    @GetMapping(params = "registrationId")
    public ResponseUtil getCarDetail(String registrationId){
        CarDTO carDetail = service.getCarDetail(registrationId);
        System.out.println(carDetail.toString());
        return new ResponseUtil("200","Get",carDetail);
    }
}
