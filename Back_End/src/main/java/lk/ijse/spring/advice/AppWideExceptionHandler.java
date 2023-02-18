package lk.ijse.spring.advice;

import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

public class AppWideExceptionHandler {

    public ResponseUtil handleException(RuntimeException e){
        return new ResponseUtil("500",e.getMessage(),null);
    }
    }

