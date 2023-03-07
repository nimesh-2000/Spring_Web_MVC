package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PaymentDTO {
    private String paymentId;
    private LocalDate date;
    private double rent_amount;
    private double extra_mileage;
    private double total;
    private double damage_cost;
    private String damageDescription;
    private String payment_status;
    private String rentalId;
}
