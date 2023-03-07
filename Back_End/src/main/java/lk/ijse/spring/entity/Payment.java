package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Payment {
    @Id
    private String paymentId;
    private LocalDate date;
    private double rent_amount;
    private double extra_mileage;
    private double cost_per_extra_km;
    private double damage_cost;
    private String damageDescription;
    private String payment_status;

    @OneToOne
    private Rental rentalId;
}