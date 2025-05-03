package com.nocountry.playattention.service.impl;

import com.nocountry.playattention.dto.event.EventCreateRequestDTO;
import com.nocountry.playattention.mappers.EventMapper;
import com.nocountry.playattention.model.Event;
import com.nocountry.playattention.model.EventUser;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.EventRepository;
import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.service.IEventService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService implements IEventService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventService(UserRepository userRepository, EventRepository eventRepository, EventMapper eventMapper) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    @Override
    public void saveEvent(Event event) {
        eventRepository.save(event);
    }


    @Override
    @Transactional
    public Event createEvent(EventCreateRequestDTO dto) {
        // 1. Mapear y guardar el evento base
        Event event = eventMapper.mapToEntity(dto);
        event = eventRepository.save(event);

        // 2. Obtener usuarios por roles y por IDs
        Set<User> usersByRole = dto.roleIds() != null ? userRepository.getUsersByRolesId(dto.roleIds()) : Set.of();
        Set<User> usersById = dto.userIds() != null ? new HashSet<>(userRepository.findAllById(dto.userIds())) : Set.of();

        // 3. Combinar ambos conjuntos
        Set<User> finalUsers = new HashSet<>();
        finalUsers.addAll(usersByRole);
        finalUsers.addAll(usersById);

        // 4. Crear relaciones EventUser sin manipular user.getEventUsers()
        Event finalEvent = event;
        Set<EventUser> eventUsers = finalUsers.stream()
                .map(user -> new EventUser(finalEvent, user, false))
                .collect(Collectors.toSet());

        // 5. Establecer relaciones en el evento
        event.getEventUsers().addAll(eventUsers);

        // 6. Guardar el evento completo
        return eventRepository.save(event);
    }

    @Override
    public List<Event> findEventsByUserId(Long userId) {
        return eventRepository.findEventsByUserId(userId);
    }

}
