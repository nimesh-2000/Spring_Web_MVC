package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class RentDetails {
    @EmbeddedId
    private RentalDetails_PK id;
    @ManyToOne
    private Driver driverId;
    private String rental_status;
    private String payment_slip;
}
