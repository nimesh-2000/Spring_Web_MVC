package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepo extends JpaRepository<Payment,String> {
    @Query(value = "SELECT paymentId FROM Payment ORDER BY paymentId DESC LIMIT 1", nativeQuery = true)
    String generatePaymentId();

    @Override
    long count();

    //========================================================================================

    @Query(value = "SELECT SUM(total) FROM Payment WHERE date = ?", nativeQuery = true)
    double dailyIncome(String date);

    @Query(value = "SELECT YEAR(date),MONTH(date),SUM(total)  Total FROM Payment  GROUP BY YEAR(date), MONTH(date)", nativeQuery = true)
    String getMonthlyIncome();

    @Query(value = "SELECT YEAR(date)AS Year,SUM(total)AS Total FROM Payment GROUP BY YEAR(date)",nativeQuery = true)
    String getAnnuallyIncome();
}
