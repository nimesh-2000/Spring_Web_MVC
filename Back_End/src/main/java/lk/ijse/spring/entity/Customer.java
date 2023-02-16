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
public class Customer {
    @Id
    private String customerId;
    private String cusName;
    private String nic;
    private String contactNo;
    private String address;
    private String email;
    private String password;
    private String drivingLicenceNumber;
    private String imageLocation;

    @OneToMany(mappedBy = "cusId")
    private List<Rental> rentalDetails;


}
