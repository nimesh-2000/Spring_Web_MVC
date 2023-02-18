package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.service.DriverService;

import java.util.List;

public class DriverServiceImpl implements DriverService {
    @Override
    public DriverDTO checkDriverLogIn(String name, String password) {
        return null;
    }

    @Override
    public void saveDriver(DriverDTO driverDTO) {

    }

    @Override
    public void UpdateDriver(DriverDTO driverDTO) {

    }

    @Override
    public void deleteDriver(String id) {

    }

    @Override
    public DriverDTO getDriverDetail(String id) {
        return null;
    }

    @Override
    public List<DriverDTO> getAllDriverDetail() {
        return null;
    }

    @Override
    public List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status) {
        return null;
    }
}
