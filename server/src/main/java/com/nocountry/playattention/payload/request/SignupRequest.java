
package com.nocountry.playattention.payload.request;

import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;


 // Clase que representa la solicitud de registro de usuario

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Detalles de la solicitud de registro de usuario")
public class SignupRequest {

    @Schema(description = "Nombre de usuario único para inicio de sesión", example = "john.doe123")
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @Schema(description = "Nombre de pila del usuario", example = "John")
    @NotBlank
    @Size(max = 50)
    private String name;

    @Schema(description = "Apellido del usuario", example = "Doe")
    @NotBlank
    @Size(max = 50)
    private String lastName;

    @Schema(description = "Dirección de correo electrónico única", example = "john.doe@example.com")
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Schema(description = "Contraseña (mínimo 6 caracteres)", example = "password123")
    @NotBlank
    @Size(min = 6, max = 120)
    private String password;

    @Schema(description = "Nombre de la institución a la que pertenece el usuario (Opcional)", example = "Universidad X")
    private String institution;

    @Schema(description = "Número de teléfono de contacto (Opcional)", example = "+1234567890")
    private String phoneNumber;

    @Schema(description = "Profesión del usuario (Opcional, relevante para profesionales)", example = "Psicólogo")
    private String profession;

    @Schema(description = "Indica si el usuario desea suscribirse al boletín", example = "true")
    private boolean newsletterSubscription;

    @Schema(description = "Tipo de usuario (Particular, Profesional, Corporativo)", example = "PROFESSIONAL")
    private UserType userType;

    @Schema(description = "Conjunto de roles asignados al usuario (e.g., [\"ROLE_USER\"], [\"ROLE_PROFESSIONAL\"]).", example = "[\"ROLE_USER\"]")
    private Set<ERole> roles;
}
