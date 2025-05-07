package com.nocountry.playattention.payload.response;

import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.Role;

import java.util.List;

public record LoginResponseDTO(
        String token,
        Long id,
        String username,
        String email,
        String name,
        String lastName,
        List<ERole>roles
) {
}
