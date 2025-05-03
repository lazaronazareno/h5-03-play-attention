package com.nocountry.playattention.service.email;

import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;

import java.util.Map;

public interface IEmailService {

    void sendTemplateEmail(String[] to, String subject, Map<String, Object> variables, String templateName);

    void recoverPassword(RecoverPasswordRequestDTO recoverPasswordRequest);
}
