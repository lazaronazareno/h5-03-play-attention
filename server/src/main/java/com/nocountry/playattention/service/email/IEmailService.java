package com.nocountry.playattention.service.email;

import java.util.Map;

public interface IEmailService {

    void sendTemplateEmail(String[] to, String subject, Map<String, Object> variables, String templateName);
}
