package com.nocountry.playattention.payload.request;

public class LogoutRequest {

 //Clase que representa la solicitud de cierre de sesión

    // Si se requiere información adicional para el logout, como un motivo o confirmación, se pueden agregar aquí

    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}