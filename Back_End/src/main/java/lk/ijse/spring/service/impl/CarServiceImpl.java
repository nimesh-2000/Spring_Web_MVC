package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.service.CarService;

import java.util.List;

public class CarServiceImpl implements CarService {
    @Override
    public void saveCar(CarDTO carDTO) {

    }

    @Override
    public void updateCar(CarDTO carDTO) {

    }

    @Override
    public void deleteCar(String id) {

    }

    @Override
    public CarDTO getCarDetail(String id) {
        return null;
    }

    @Override
    public List<CarDTO> getAllCarDetail() {
        return null;
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
}
