package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.RentalDTO;

import java.util.ArrayList;
import java.util.List;

public interface RentalService {
     String generateRentalId();


     void saveRental(RentalDTO rentalDTO);

     void uploadRentalImages(String payment_slip, String rentalId) ;

     ArrayList<RentalDTO> getAllRentals();

     void deleteRental(String id);

     void updateRental(RentalDTO rentalDTO);

     RentalDTO searchRent(String rentalId);

     void updateCarRentStatus(String rentID, String status);

     void denyRental(String rentId);

     long count();

     List<RentalDTO> getAllByDriverId(String status, String driverId);
     List<RentalDTO> getAllByCusNic(String nic);

}
