package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.RentalService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@CrossOrigin
@RequestMapping("/rental")
@RestController
public class RentalController {
    @Autowired
    RentalService service;

    @GetMapping(path = "/generateRentalId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateRentalId() {
        String s = service.generateRentalId();
        return new ResponseUtil("200", "Ok", s);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveRental(@RequestBody RentalDTO dto){
        service.saveRental(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil saveRental(@RequestPart("rImageFile") MultipartFile[] file, @RequestPart("rental") RentalDTO rentalDTO) {


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil("500", "Rental Failed.Try Again Latter", null);
            }
        }

        service.saveRental(rentalDTO);
        return new ResponseUtil("200", "Registration Successfully....", rentalDTO);
    }


    @PostMapping(path = "/uploadImg/{rentalId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("payment_slip") MultipartFile payment_slip, @PathVariable String rentalId) {
        try {

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\paymentSlip");
            uploadsDir.mkdir();

            payment_slip.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + payment_slip.getOriginalFilename()));

            String rentalImageLocationPath = projectPath + "\\paymentSlip" + payment_slip.getOriginalFilename();

            service.uploadRentalImages(rentalImageLocationPath, rentalId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }
}
