package com.nocountry.playattention.dto.mail;

import jakarta.validation.constraints.Email;

public record SendMailUserDTO(
        @Email
        String email,
        String subject,
        String message
) {
}
