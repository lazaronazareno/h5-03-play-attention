package com.nocountry.playattention.dto.user;

import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.UserType;

import java.util.Set;

public record UserResponseDTO(
        Long id,
        String username,
        String name,
        String lastName,
        String email,
        String institution,
        String phoneNumber,
        String profession,
        boolean newsletterSubscription,
        Set<ERole> roles,
        UserType userType
) {
}
