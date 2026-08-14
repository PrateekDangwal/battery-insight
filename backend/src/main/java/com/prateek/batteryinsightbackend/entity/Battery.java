package com.prateek.batteryinsightbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "batteries")
public class Battery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String batteryId;

    private String chemistry;
    private Double capacity;
    private Integer cycleCount;

    public Battery() {}

    public Long getId() { return id; }
    public String getBatteryId() { return batteryId; }
    public void setBatteryId(String batteryId) { this.batteryId = batteryId; }
    public String getChemistry() { return chemistry; }
    public void setChemistry(String chemistry) { this.chemistry = chemistry; }
    public Double getCapacity() { return capacity; }
    public void setCapacity(Double capacity) { this.capacity = capacity; }
    public Integer getCycleCount() { return cycleCount; }
    public void setCycleCount(Integer cycleCount) { this.cycleCount = cycleCount; }
}
