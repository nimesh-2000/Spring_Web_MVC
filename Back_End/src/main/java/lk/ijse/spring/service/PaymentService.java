package lk.ijse.spring.service;

import lk.ijse.spring.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {

    String generatePaymentId();

    void makePaymentForReservation(PaymentDTO paymentDTO);

    String getIncomeByDate(String type, String start_date, String end_date);

    List<PaymentDTO> getTodayIncomeList();

    void savePayment(PaymentDTO dto);

    long count();

    //=======================================================================================

    double getDailyIncome(String date);

    String getMonthlyIncome();

    String getAnnuallyIncome();
}
