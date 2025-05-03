package com.nocountry.playattention.dto.lead;

import java.time.LocalDateTime;
import java.util.Set;

public record EventRequestDTO(
        String title,
        String description,
        LocalDateTime notificationTime,
        Set<Integer> roleIds,   // IDs de roles seleccionados
        Set<Long> userIds   // IDs de usuarios a notificar
) {
}
