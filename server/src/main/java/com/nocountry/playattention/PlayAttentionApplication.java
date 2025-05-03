package com.nocountry.playattention;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PlayAttentionApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayAttentionApplication.class, args);
	}

}