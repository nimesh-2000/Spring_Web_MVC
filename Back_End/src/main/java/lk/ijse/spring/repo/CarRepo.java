package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface CarRepo extends JpaRepository<Car,String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE Car SET image_1=:image_1,image_2=:image_2,image_3=:image_3,image_4=:image_4 WHERE registrationId=:registrationId", nativeQuery = true)
    void updateCarFilePaths(@Param("image_1") String image_1,
                            @Param("image_2") String image_2,
                            @Param("image_3") String image_3,
                            @Param("image_4") String image_4,
                            @Param("registrationId") String registrationId);

    Car getCarByRegistrationId(String registrationId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Car SET availability=:availability WHERE registrationId=:registrationId", nativeQuery = true)
    void updateCarAvailabilityStatus(@Param("registrationId") String registrationId, @Param("availability") String availability);

    @Override
    long count();
}
