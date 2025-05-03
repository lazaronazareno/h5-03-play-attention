package com.nocountry.playattention.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "event_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventUser {

    @EmbeddedId
    private EventUserId id = new EventUserId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    @JsonBackReference
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "checked", nullable = false)
    private boolean checked;

    public EventUser(Event event, User user, boolean checked) {
        this.event = event;
        this.user = user;
        this.checked = checked;
        this.id = new EventUserId(event.getId(), user.getId());
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EventUser)) return false;
        EventUser that = (EventUser) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
