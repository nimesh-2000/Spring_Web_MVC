package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.service.PaymentService;

import java.util.List;

public class PaymentServiceImpl implements PaymentService {
    @Override
    public String generateReservationBillIdId() {
        return null;
    }

    @Override
    public void makePaymentForReservation(PaymentDTO paymentDTO) {

    }

    @Override
    public String getIncomeByDate(String type, String start_date, String end_date) {
        return null;
    }

    @Override
    public List<PaymentDTO> getTodayIncomeList() {
        return null;
    }
}
