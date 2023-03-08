package lk.ijse.spring.Controller;

import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/payment")
@RestController
public class PaymentController {


    @Autowired
    PaymentService service;

    @GetMapping(path = "/generatePaymentId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generatePaymentId() {
        String s = service.generatePaymentId();
        return new ResponseUtil("200", "Ok", s);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto) {
        System.out.println(dto.toString());
        service.savePayment(dto);
        return new ResponseUtil("200", "Payment Added Successfully " + dto.toString(), null);
    }

    @GetMapping(path = "/paymentCount")
    public ResponseUtil getAllPaymentCount() {
        long count = service.count();
        return new ResponseUtil("200", " Success", count);
    }

//    ===============================================================================

    @GetMapping(params = "date")
    public ResponseUtil getDailyIncome(String date) {
        double dailyIncome = service.getDailyIncome(date);
        return new ResponseUtil("200", "Success", dailyIncome);
    }

    @GetMapping("/monthlyIncome")
    public ResponseUtil getMonthlyIncome() {
        String monthlyIncome = service.getMonthlyIncome();
        return new ResponseUtil("200", "Success", monthlyIncome);
    }

    @GetMapping("/annuallyIncome")
    public ResponseUtil getAnnuallyIncome() {
        String annuallyIncome = service.getAnnuallyIncome();
        return new ResponseUtil("200", "Success", annuallyIncome);
    }
}

