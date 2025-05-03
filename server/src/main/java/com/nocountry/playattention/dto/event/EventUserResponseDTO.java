package com.nocountry.playattention.dto.event;

import com.nocountry.playattention.dto.user.UserResponseDTO;
import com.nocountry.playattention.model.EventUserId;

public record EventUserResponseDTO(
        EventUserId id,
        UserResponseDTO user,
        boolean checked
) {
}
