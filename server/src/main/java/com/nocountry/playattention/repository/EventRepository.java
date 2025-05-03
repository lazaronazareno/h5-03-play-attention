package com.nocountry.playattention.repository;

import com.nocountry.playattention.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.notificationTime BETWEEN :start AND :end AND e.notified = false")
    List<Event> findEventsToNotify(@Param("start") LocalDateTime start,
                                   @Param("end") LocalDateTime end);

    @Query("SELECT e FROM Event e " +
            "JOIN EventUser eu ON e.id = eu.event.id " +
            "WHERE eu.user.id = :userId")
    List<Event> findEventsByUserId(@Param("userId") Long userId);

}
