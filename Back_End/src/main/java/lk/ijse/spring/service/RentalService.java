package lk.ijse.spring.service;

import lk.ijse.spring.dto.RentalDTO;

import java.util.ArrayList;

public interface RentalService {
     String generateRentalId();


     void saveRental(RentalDTO rentalDTO);

     void uploadRentalImages(String payment_slip, String rentalId) ;

     ArrayList<RentalDTO> getAllRentals();

     void deleteRental(String id);

}
