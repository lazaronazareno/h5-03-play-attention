package com.nocountry.playattention.dto.event;

import java.time.LocalDateTime;
import java.util.List;

public record EventResponseDTO(
        Long id,
        String title,
        String description,
        LocalDateTime notificationTime,
        Boolean notified,
        List<EventUserResponseDTO> eventUsers
) {
}

