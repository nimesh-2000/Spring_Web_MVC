package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ReservationDTO;
import lk.ijse.spring.service.ReservationService;

import java.util.List;

public class ReservationServiceImpl implements ReservationService {
    @Override
    public String generateReservationId() {
        return null;
    }

    @Override
    public void requestReservation(ReservationDTO ReservationDTO) {

    }

    @Override
    public void updateReservationStatus(String reserve_id, String driver_id, String status) {

    }

    @Override
    public List<ReservationDTO> getAllPendingReservation() {
        return null;
    }

    @Override
    public ReservationDTO getReservationDetail(String id) {
        return null;
    }

    @Override
    public List<ReservationDTO> getAllTodayReservation() {
        return null;
    }

    @Override
    public List<ReservationDTO> getAllTodayPickUps() {
        return null;
    }

    @Override
    public List<ReservationDTO> getCustomerReservationByStatus(String id, String status) {
        return null;
    }
}
