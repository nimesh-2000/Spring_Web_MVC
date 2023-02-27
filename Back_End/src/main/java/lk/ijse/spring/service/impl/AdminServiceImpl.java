package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Car;
import lk.ijse.spring.repo.AdminRepo;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminRepo repo;

    @Autowired
    ModelMapper mapper;
    @Override
    public void saveAdmin(AdminDTO adminDTO) {
        if (repo.existsById(adminDTO.getAdminId())){
            throw new RuntimeException("Customer "+adminDTO.getAdminId()+" Already Exist..!");
        }
        Admin entity = mapper.map(adminDTO, Admin.class);
        repo.save(entity);
    }

    @Override
    public AdminDTO checkAdminLogIn(String id, String password) {
        return null;
    }

    @Override
    public AdminDTO searchAdminByEmail(String email) {
        return mapper.map( repo.getAdminByEmail(email), AdminDTO.class);
    }
}
