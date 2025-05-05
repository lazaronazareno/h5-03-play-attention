package com.nocountry.playattention.exception;

import org.springframework.http.HttpStatus;

//clase para manejar excepciones de recurso no encontrado
public class ResourceNotFoundException extends ApiException {
    public ResourceNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND.value(), message);
    }
}
