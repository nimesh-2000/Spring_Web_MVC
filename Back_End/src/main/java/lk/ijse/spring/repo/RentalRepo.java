package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RentalRepo extends JpaRepository<Rental,String> {
    @Query(value = "SELECT rentalId FROM Rental ORDER BY rentalId DESC LIMIT 1", nativeQuery = true)
    String generateRentalId();
}
