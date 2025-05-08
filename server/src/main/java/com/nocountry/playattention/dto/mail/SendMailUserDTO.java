package com.nocountry.playattention.dto.mail;

import jakarta.validation.constraints.Email;

public record SendMailUserDTO(
        @Email
        String to,
        String subject,
        String message
) {
}
