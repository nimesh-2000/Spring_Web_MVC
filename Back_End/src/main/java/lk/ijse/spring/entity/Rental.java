package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Rental {
    @Id
    private String rentalId;
    private LocalDate pickUpDate;
    private LocalDate returnDate;
    private String payment_slip;
    //    private double amount;
    private String rental_status;
    private double total_damage_waiver_payment;
    private String pickupLocation;
    private String returnLocation;
    private String driverOption;


    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "nic",referencedColumnName = "nic",nullable = false)
    private Customer cusNic;

    @ManyToOne
    @JoinColumn(name = "driverId",referencedColumnName = "driverId")
    private Driver driverId;

    @ManyToOne
    @JoinColumn(name = "registrationId",referencedColumnName = "registrationId")
    private Car registrationId;
}
