package com.nocountry.playattention.service;


import com.nocountry.playattention.dto.event.EventCreateRequestDTO;
import com.nocountry.playattention.model.Event;

import java.util.List;

public interface IEventService {

    void saveEvent(Event event);

    Event createEvent(EventCreateRequestDTO dto);

    List<Event> findEventsByUserId(Long userId);

}
