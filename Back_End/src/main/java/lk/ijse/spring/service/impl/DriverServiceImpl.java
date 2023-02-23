package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.repo.AdminRepo;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DriverServiceImpl implements DriverService {
    @Autowired
    DriverRepo repo;

    @Autowired
    ModelMapper mapper;
    @Override
    public DriverDTO checkDriverLogIn(String name, String password) {
        return null;
    }

    @Override
    public void saveDriver(DriverDTO driverDTO) {
        if (repo.existsById(driverDTO.getDriverId())){
            throw new RuntimeException("Driver "+driverDTO.getDriverId()+" Already Exist..!");
        }
        Driver entity = mapper.map(driverDTO, Driver.class);
        repo.save(entity);
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
