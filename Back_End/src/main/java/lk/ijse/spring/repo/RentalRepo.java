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

    @Modifying
    @Transactional
    @Query(value = "UPDATE Rental SET rental_status=:rental_status WHERE rentalId=:rentalId", nativeQuery = true)
    void updateCarRentStatus(@Param("rentalId") String rentalId, @Param("rental_status") String rental_status);

    @Query(value = "SELECT * from Rental where rental_status=:rental_status AND driverId=:driverId", nativeQuery = true)
    List<Rental> getAllByDriverId(@Param("rental_status") String rental_status, @Param("driverId") String driverId);

    @Override
    long count();

    @Query(value = "SELECT * from Rental where nic=:nic", nativeQuery = true)
    List<Rental> getAllByCusNic(@Param("nic") String nic);
}
