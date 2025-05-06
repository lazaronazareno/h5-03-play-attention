package com.nocountry.playattention.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse<T> {
    private String message;
    private T data;

    public MessageResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }
}
