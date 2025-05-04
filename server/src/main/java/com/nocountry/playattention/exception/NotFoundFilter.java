package com.nocountry.playattention.exception;

import org.springframework.stereotype.Component;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.util.Date;
import com.fasterxml.jackson.databind.ObjectMapper;
// clase para interceptar las excepciones y devolver una respuesta personalizada
@Component
public class NotFoundFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(NotFoundFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (Exception e) {
            logger.error("Error processing request: {}", e.getMessage());
            
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            ApiErrorResponse error = new ApiErrorResponse();
            
            if (e instanceof NoHandlerFoundException) {
                error.setStatus(HttpStatus.NOT_FOUND.value());
                error.setMessage("Resource not found: " + ((NoHandlerFoundException) e).getRequestURL());
            } else if (e instanceof HttpRequestMethodNotSupportedException) {
                error.setStatus(HttpStatus.METHOD_NOT_ALLOWED.value());
                error.setMessage("Method not allowed: " + ((HttpRequestMethodNotSupportedException) e).getMethod());
            } else {
                error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
                error.setMessage("Internal server error: " + e.getMessage());
            }
            
            error.setTimestamp(new Date().toString());
            
            httpResponse.setContentType("application/json");
            httpResponse.setStatus(error.getStatus());
            httpResponse.getWriter().write(new ObjectMapper().writeValueAsString(error));
        }
    }
}
