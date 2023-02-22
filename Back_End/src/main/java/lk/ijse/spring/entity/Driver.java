package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Driver {
    @Id
    private String driverId;
    private String name;
    private String dob;
    private String nic;
    private String drivingLicenceNum;
    private String availability;

    @OneToMany(mappedBy = "driverId")
    private List<RentDetails> rentalDetailsList;
}
