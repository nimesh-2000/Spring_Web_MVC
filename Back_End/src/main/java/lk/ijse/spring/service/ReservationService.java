package lk.ijse.spring.service;

import lk.ijse.spring.dto.RentalDTO;

import java.util.List;

public interface ReservationService {

    String generateReservationId();

    void requestReservation(RentalDTO ReservationDTO);

    void updateReservationStatus(String reserve_id, String driver_id, String status);

    List<RentalDTO> getAllPendingReservation();

    RentalDTO getReservationDetail(String id);

    List<RentalDTO> getAllTodayReservation();

    List<RentalDTO> getAllTodayPickUps();

    List<RentalDTO> getCustomerReservationByStatus(String id, String status);
}
