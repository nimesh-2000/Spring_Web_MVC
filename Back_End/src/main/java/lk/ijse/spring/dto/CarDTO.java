package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarDTO {
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
        private long lastServiceMileage;
        private long freeMileage;
        private double dailyRate;
        private double monthlyRate;
        private double priceForExtraKm;
        private String availability;

        }
