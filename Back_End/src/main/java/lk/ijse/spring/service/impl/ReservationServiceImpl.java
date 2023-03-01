package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.service.ReservationService;

import java.util.List;

public class ReservationServiceImpl implements ReservationService {
    @Override
    public String generateReservationId() {
        return null;
    }

    @Override
    public void requestReservation(RentalDTO ReservationDTO) {

    }

    @Override
    public void updateReservationStatus(String reserve_id, String driver_id, String status) {

    }

    @Override
    public List<RentalDTO> getAllPendingReservation() {
        return null;
    }

    @Override
    public RentalDTO getReservationDetail(String id) {
        return null;
    }

    @Override
    public List<RentalDTO> getAllTodayReservation() {
        return null;
    }

    @Override
    public List<RentalDTO> getAllTodayPickUps() {
        return null;
    }

    @Override
    public List<RentalDTO> getCustomerReservationByStatus(String id, String status) {
        return null;
    }
}
