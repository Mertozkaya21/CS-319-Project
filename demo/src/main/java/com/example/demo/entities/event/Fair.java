package com.example.demo.entities.event;

import java.util.List;

import com.example.demo.entities.user.Guide;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode(callSuper = true)
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Fair")
@Getter
public class Fair extends Event{

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String organizerName;
    @Column(nullable = false)
    private String organizerPhone;
    @Column(nullable = false)
    private String organizerEmail;

    @ManyToMany
    @JoinTable(
        name = "guide_fair",
        joinColumns = @JoinColumn(name = "fair_id"),
        inverseJoinColumns = @JoinColumn(name = "guide_id")
    )
    private List<Guide> guides;


}
