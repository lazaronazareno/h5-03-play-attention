package com.nocountry.playattention.payload.response;

import com.nocountry.playattention.model.User;
import lombok.Getter;
import lombok.Setter;

// Clase que representa la respuesta de un usuario

@Setter
@Getter
public class UserResponse {
    private String message;
    private User user;

    public UserResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

}
