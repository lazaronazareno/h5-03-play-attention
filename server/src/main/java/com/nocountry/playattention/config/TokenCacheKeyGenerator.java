package com.nocountry.playattention.config;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;
import java.lang.reflect.Method;

// Clase que implementa KeyGenerator para generar claves de caché personalizadas
@Component
public class TokenCacheKeyGenerator implements KeyGenerator {
    
    @Override
    public Object generate(Object target, Method method, Object... params) {
        // El primer parámetro siempre será el token
        String token = (String) params[0];
        return "tokenBlacklist:" + token;
    }


}
