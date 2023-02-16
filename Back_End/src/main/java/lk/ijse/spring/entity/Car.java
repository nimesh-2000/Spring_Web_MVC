package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Car {
    @Id
    private String registrationId;
    private String brand;
    private String type;
    private String model;
    private String fuelType;
    private String transmissionType;
    private String colour;
    private int noOfPassengers;
    private String image_1;
    private String image_2;
    private String image_3;
    private String image_4;
    private long freeMileage;
    private String lastServiceMileage;
    private double dailyRate;
    private double monthlyRate;
    private double priceForExtraKm;
    private String availability;
}
