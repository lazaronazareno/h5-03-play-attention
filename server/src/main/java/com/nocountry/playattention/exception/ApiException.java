package com.nocountry.playattention.exception;

import lombok.Getter;
//clase para manejar excpeciones especificas de la API
@Getter
public class ApiException extends RuntimeException {
    private final int status;
    private final String message;

    public ApiException(int status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
