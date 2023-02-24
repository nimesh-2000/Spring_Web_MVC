package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

public interface CustomerRepo extends JpaRepository<Customer,String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET imageLocation=:imageLocation WHERE nic=:nic", nativeQuery = true)
    void updateCustomerFilePaths(@Param("imageLocation") String imageLocation, @Param("nic") String nic);
}
