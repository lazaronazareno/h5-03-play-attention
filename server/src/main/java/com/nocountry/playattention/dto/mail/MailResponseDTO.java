package com.nocountry.playattention.dto.mail;

import java.time.LocalDateTime;

public record MailResponseDTO(
        Long id,
        String to,
        String subject,
        String message,
        LocalDateTime sendDate,
        String from
) {
}
