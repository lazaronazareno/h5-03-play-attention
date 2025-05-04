package com.nocountry.playattention.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//Clase de configuracion para el cache
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public TokenCacheKeyGenerator cacheKeyGenerator() {
        return new TokenCacheKeyGenerator();
    }
}
