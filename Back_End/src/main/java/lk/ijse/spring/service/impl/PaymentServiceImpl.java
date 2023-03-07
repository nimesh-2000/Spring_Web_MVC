package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.entity.Payment;
import lk.ijse.spring.repo.PaymentRepo;
import lk.ijse.spring.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    PaymentRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public String generatePaymentId() {
        String lastId = repo.generatePaymentId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "P00-000" + tempId;
            } else if (tempId <= 99) {
                id = "P00-00" + tempId;
            } else if (tempId <= 999) {
                id = "P00-0" + tempId;
            } else if (tempId <= 9999) {
                id = "P00-" + tempId;
            }
        } else {
            id = "P00-0001";
        }
        return id;
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

    @Override
    public void savePayment(PaymentDTO dto) {
        if (!repo.existsById(dto.getPaymentId())) {
            repo.save(mapper.map(dto, Payment.class));
        } else {
            throw new RuntimeException("Payment "+dto.getPaymentId()+" Already Exist....!");
        }
    }

    @Override
    public long count() {
        return repo.count();
    }

    //============================================================================

    @Override
    public double getDailyIncome(String date) {
        return mapper.map(repo.dailyIncome(date),double.class);
    }

    @Override
    public String getMonthlyIncome() {
        return mapper.map(repo.getMonthlyIncome(),String.class);
    }

    @Override
    public String getAnnuallyIncome() {
        return mapper.map(repo.getAnnuallyIncome(),String.class);
    }
}
