package com.nocountry.playattention.dto.recover;

public record ResetPasswordRequestDTO(
        String password,
        String repeatPassword
) {
}
