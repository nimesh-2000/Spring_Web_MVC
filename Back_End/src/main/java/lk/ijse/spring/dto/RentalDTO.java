package lk.ijse.spring.dto;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.RentDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalDTO {
    private String rentalId;
    private Customer nic;
    private LocalDate pickUpDate;
    private LocalDate returnDate;
    private String rental_status;
    private String payment_slip;
    private double amount;
    private double total_damage_waiver_payment;
    private String pickupLocation;
    private String returnLocation;
    private List<RentDetails> rentDetails;
}
