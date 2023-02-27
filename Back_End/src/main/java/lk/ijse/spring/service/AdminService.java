package lk.ijse.spring.service;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;

public interface AdminService {
    void saveAdmin(AdminDTO adminDTO);
    AdminDTO checkAdminLogIn(String id, String password);
     AdminDTO searchAdminByEmail(String email);
}
