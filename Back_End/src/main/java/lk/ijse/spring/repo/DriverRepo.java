package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface DriverRepo extends JpaRepository<Driver,String> {
    Driver getDriverByDrivingLicenceNum(String drivingLicenceNum);

    //    @Query(value = "SELECT * from Driver where availability 'Available' DESC LIMIT 1",nativeQuery = true)
//    Driver getAllByAvailability();

    @Query(value = "SELECT * from Driver where availability 'Available'",nativeQuery = true)
    Driver getAllByAvailability();

    Driver getDriverByAvailability(String availability);

//    @Query(value = " select * from driver order by rand() limit 1; ", nativeQuery = true)
//    Driver findDriverRandomly();

//    Driver getDriverByDriver_id(String drivingId);
@Query(value = " select * from driver order by rand() limit 1; ", nativeQuery = true)
Driver findDriverRandomly();

    @Modifying
    @Transactional
    @Query(value = "UPDATE Driver SET availability=:availability WHERE driverId=:driverId", nativeQuery = true)
    void updateDriverAvailabilityStatus(@Param("driverId") String driverID, @Param("availability") String availability);
}
