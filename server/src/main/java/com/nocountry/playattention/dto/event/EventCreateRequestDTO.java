package com.nocountry.playattention.dto.event;


import java.time.LocalDateTime;
import java.util.Set;

public record EventCreateRequestDTO(
        String title,
        String description,
        LocalDateTime notificationTime,
        LocalDateTime scheduledNotification,
        Boolean notified,
        Set<Long> roleIds,
        Set<Long> userIds   // IDs de usuarios a notificar

) {
}
