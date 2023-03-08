package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.repo.AdminRepo;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
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
        if (repo.existsById(driverDTO.getDriverId())) {
            throw new RuntimeException("Driver " + driverDTO.getDriverId() + " Already Exist..!");
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
        List<DriverDTO> list = new ArrayList<>();
        List<Driver> all = repo.findAll();
        for (Driver d : all) {
            list.add(new DriverDTO(d.getDriverId(), d.getName(), d.getNic(), d.getDrivingLicenceNum(), d.getAvailability()));
        }
        return list;
        // return mapper.map(repo.findAll(),new TypeToken<List<DriverDTO>>(){}.getType());
    }

    @Override
    public List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status) {
        return null;
    }

    @Override
    public DriverDTO searchDriverByLicense(String license) {
        return mapper.map(repo.getDriverByDrivingLicenceNum(license), DriverDTO.class);
    }

//    @Override
//    public DriverDTO searchDriverByDriver_id(String driver_id) {
//        return mapper.map( repo.getDriverByDriver_id(driver_id), DriverDTO.class);
//    }

    @Override
    public DriverDTO searchDriverByAvailability(String availability) {
        Driver d = repo.getDriverByAvailability(availability);
        return new DriverDTO(d.getDriverId(), d.getName(), d.getNic(), d.getDrivingLicenceNum(), d.getAvailability());
    }

    @Override
    public DriverDTO generateDriver() {
        return mapper.map(repo.findDriverRandomly(), DriverDTO.class);
    }

    @Override
    public void updateDriverRentStatus(String driverID, String status) {
        if (repo.existsById(driverID)) {
            repo.updateDriverAvailabilityStatus(driverID, status);
        } else {
            throw new RuntimeException("Driver " + driverID + " Not Exist to Update Status....!");
        }
    }

    @Override
    public long count() {
        return repo.count();
    }

    @Override
    public String generateDriverId() {
        return null;
    }
}



