package com.nocountry.playattention.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String title;

    @NotBlank
    @Size(max = 150)
    private String description;

    @Column(name = "notification_time")
    private LocalDateTime notificationTime;

    @Column(name = "scheduled_notification")
    private LocalDateTime scheduledNotification;

    @Column(nullable = false)
    private boolean notified;


    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonManagedReference
    private Set<EventUser> eventUsers = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Event)) return false;
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void addEventUser(EventUser eventUser) {
        this.eventUsers.add(eventUser);
        eventUser.setEvent(this);
    }

}
