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
public class DriverDTO {
    private String driverId;
    private String name;
    private String dob;
    private String nic;
    private String drivingLicenceNum;
    private String availability;

    public DriverDTO(String driverId) {
        this.driverId = driverId;
    }

    public DriverDTO(String driverId, String name, String nic, String drivingLicenceNum, String availability) {
        this.driverId = driverId;
        this.name = name;
        this.nic = nic;
        this.drivingLicenceNum = drivingLicenceNum;
        this.availability = availability;
    }

}
