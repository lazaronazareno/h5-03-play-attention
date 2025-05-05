package com.nocountry.playattention.security.jwt;

import com.nocountry.playattention.exception.ApiErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Date;
import com.fasterxml.jackson.databind.ObjectMapper;

//Clase que maneja la excepción de autenticación no autorizada

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        
        ApiErrorResponse error = new ApiErrorResponse();
        error.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        error.setMessage("You are not authorized to access this resource: " + authException.getMessage());
        error.setTimestamp(new Date().toString());
        
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(new ObjectMapper().writeValueAsString(error));
    }
}