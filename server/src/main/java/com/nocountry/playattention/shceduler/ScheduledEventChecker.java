package com.nocountry.playattention.shceduler;

import com.nocountry.playattention.model.Event;
import com.nocountry.playattention.repository.EventRepository;
import com.nocountry.playattention.service.impl.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledEventChecker {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledEventChecker.class);

    private final EventRepository eventRepository;
    private final NotificationService notificationService;

    public ScheduledEventChecker(EventRepository eventRepository, NotificationService notificationService) {
        this.eventRepository = eventRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void checkAndNotify() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMinuteAgo = now.minusSeconds(30);
        LocalDateTime oneMinuteAhead = now.plusSeconds(30);

        List<Event> events = eventRepository.findEventsToNotify(oneMinuteAgo, oneMinuteAhead);
        logger.info("Buscando eventos entre {} y {}", oneMinuteAgo, oneMinuteAhead);

        logger.info("Scheduler ejecutado a {}, eventos encontrados: {}", now, events.size());

        for (Event event : events) {
            logger.info("==> Notificando evento: '{}' programado para {}", event.getTitle(), event.getNotificationTime());
            notificationService.notifyUsers(event);
            event.setNotified(true);
            eventRepository.save(event);
        }
    }
}
