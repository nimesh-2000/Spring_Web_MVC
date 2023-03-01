package lk.ijse.spring.service;

import lk.ijse.spring.dto.RentalDTO;

public interface RentalService {
    public String generateRentalId();


    public void saveRental(RentalDTO rentalDTO);

    public void uploadRentalImages(String payment_slip, String rentalId) ;

}
