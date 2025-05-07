package com.nocountry.playattention.payload.response;

import com.nocountry.playattention.dto.user.UserResponseDTO;

public record LoginResponseDTO(
        String token,
        UserResponseDTO user
) {
}
