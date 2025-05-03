package com.nocountry.playattention.service;

import com.nocountry.playattention.model.Event;

public interface INotificationService {
    void notifyUsers(Event event);
}
