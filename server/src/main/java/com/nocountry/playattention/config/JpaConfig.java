package com.nocountry.playattention.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EnableJpaRepositories(basePackages = {"com.nocountry.playattention.repository", "com.nocountry.playattention.security.jwt"})
@EnableTransactionManagement
public class JpaConfig {

    //configuracion adicional de jpa si fuera necesario
}
