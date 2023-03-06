package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.entity.Car;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    CarRepo repo;

    @Autowired
    ModelMapper mapper;
    @Override
    public void saveCar(CarDTO carDTO) {
        if (repo.existsById(carDTO.getRegistrationId())){
            throw new RuntimeException("Customer "+carDTO.getRegistrationId()+" Already Exist..!");
        }
        Car entity = mapper.map(carDTO, Car.class);
        repo.save(entity);
    }

    @Override
    public void updateCar(CarDTO carDTO) {
        if (!repo.existsById(carDTO.getRegistrationId())){
            throw new RuntimeException("Car "+carDTO.getRegistrationId()+" Not Available to Update..!");
        }
        Optional<Car> updateCar = repo.findById(carDTO.getRegistrationId());
        Car car = updateCar.get();
        car.setPriceForExtraKm(carDTO.getPriceForExtraKm());
        car.setDailyRate(carDTO.getDailyRate());
        car.setMonthlyRate(carDTO.getMonthlyRate());
        car.setFreeMileage(carDTO.getFreeMileage());
        repo.save(updateCar.get());
    }

    @Override
    public void deleteCar(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Car "+id+" Not Available to Delete..!");
        }
        repo.deleteById(id);
    }

//    @Override
//    public void deleteCar(String id) {
//        if (!repo.existsById(id)){
//            throw new RuntimeException("Car "+id+" Not Available to Delete..!");
//        }
//        repo.deleteById(id);
//    }

    @Override
    public CarDTO getCarDetail(String registrationId) {
        return mapper.map( repo.getCarByRegistrationId(registrationId),CarDTO.class);
    }

    @Override
        public ArrayList<CarDTO> getAllCarDetail() {
            return mapper.map(repo.findAll(),new TypeToken<ArrayList<CarDTO>>(){}.getType());
        }


    @Override
    public List<CarDTO> getCarsUnderMaintain() {
        return null;
    }

    @Override
    public List<CarDTO> getCarsNeedMaintain() {
        return null;
    }

    @Override
    public List<CarDTO> getUnavailableOrAvailableCarsByStatus(String status) {
        return null;
    }

    @Override
    public List<CarDTO> getAvailableAndRentalCarsForReservation(String pick_up_date, String return_date, String status) {
        return null;
    }

    @Override
    public void setCarStatusUnavailableOrAvailable(String id, String status) {

    }

    @Override
    public List<CarDTO> sortCarsByAttributes(CarDTO carDTO) {
        return null;
    }

    @Override
    public void uploadCarImages(String frontPath, String backPath, String sidePath, String interiorPath, String registrationId) {
        if (repo.existsById(registrationId)) {
            repo.updateCarFilePaths(frontPath, backPath, sidePath,interiorPath, registrationId);
        } else {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void updateCarRentStatus(String registrationNo, String status) {
        if (repo.existsById(registrationNo)) {
            repo.updateCarAvailabilityStatus(registrationNo, status);
        } else {
            throw new RuntimeException("Car "+registrationNo+" Not Exist to Update Status....!");
        }
    }
}
