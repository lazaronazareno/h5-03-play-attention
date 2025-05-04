package com.nocountry.playattention.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//clase para la estructura de la respuesta de error de la API
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiErrorResponse {
    private int status;
    private String message;
    private String timestamp;
}
