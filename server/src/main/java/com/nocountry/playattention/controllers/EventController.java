package com.nocountry.playattention.controllers;

import com.nocountry.playattention.dto.event.EventCreateRequestDTO;
import com.nocountry.playattention.dto.event.EventResponseDTO;
import com.nocountry.playattention.mappers.EventMapper;
import com.nocountry.playattention.model.Event;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.service.impl.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;

    public EventController(EventService eventService, EventMapper eventMapper) {
        this.eventService = eventService;
        this.eventMapper = eventMapper;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<MessageResponse> createEvent(@Valid @RequestBody Event event) {
        eventService.saveEvent(event);
        return ResponseEntity.ok(new MessageResponse("Evento creado exitosamente"));
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<EventResponseDTO> createEventComplete(@RequestBody EventCreateRequestDTO dto) {
        Event event = eventService.createEvent(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventMapper.mapToDto(event));
    }


}
