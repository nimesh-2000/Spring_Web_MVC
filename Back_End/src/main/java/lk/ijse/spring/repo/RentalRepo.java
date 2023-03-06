package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface RentalRepo extends JpaRepository<Rental,String> {
    @Query(value = "SELECT rentalId FROM Rental ORDER BY rentalId DESC LIMIT 1", nativeQuery = true)
    String generateRentalId();

    @Modifying
    @Transactional
    @Query(value = "UPDATE Rental SET payment_slip=:payment_slip WHERE rentalId=:rentalId", nativeQuery = true)
    void updatePaymentSlipFilePaths(@Param("payment_slip") String payment_slip, @Param("rentalId") String rentalId);


}
