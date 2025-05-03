package com.nocountry.playattention.service.impl;

import com.nocountry.playattention.model.Event;
import com.nocountry.playattention.service.INotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationService implements INotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    public void notifyUsers(Event event) {

        Optional.ofNullable(event.getTitle())
                .filter(title -> !title.isBlank())
                .ifPresent(title -> log.debug("Notificando sobre el evento: {}", title.toUpperCase()));


    }
}
