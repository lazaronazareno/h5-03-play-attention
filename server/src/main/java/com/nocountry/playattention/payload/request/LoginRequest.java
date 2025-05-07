package com.nocountry.playattention.payload.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


// Clase que representa la solicitud de inicio de sesión

@Setter
@Getter
public class LoginRequest {
    @NotBlank
    @Schema(example = "playattention")
    private String username;

    @NotBlank
    @Schema(example = "playattention123")
    private String password;

}