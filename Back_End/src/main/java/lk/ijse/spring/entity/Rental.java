package lk.ijse.spring.entity;

import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

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
