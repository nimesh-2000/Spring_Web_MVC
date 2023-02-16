package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Rental {
    @Id
    private String rentalId;
    @ManyToOne
    private Customer cusId;
    private LocalDate date;
    private LocalDate pickUpDate;
    private LocalDate returnDate;
    private double amount;
    private double total_damage_waiver_payment;
    private String pickupLocation;
    private String returnLocation;
}
