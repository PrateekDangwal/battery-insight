package com.prateek.batteryinsightbackend.dto;

public class BatteryResponse {
    private String batteryId;
    private String chemistry;
    private Double capacity;
    private Integer cycleCount;

    public BatteryResponse() {}
    public BatteryResponse(String batteryId, String chemistry, Double capacity, Integer cycleCount) {
        this.batteryId = batteryId; this.chemistry = chemistry;
        this.capacity = capacity; this.cycleCount = cycleCount;
    }
    public String getBatteryId() { return batteryId; }
    public void setBatteryId(String batteryId) { this.batteryId = batteryId; }
    public String getChemistry() { return chemistry; }
    public void setChemistry(String chemistry) { this.chemistry = chemistry; }
    public Double getCapacity() { return capacity; }
    public void setCapacity(Double capacity) { this.capacity = capacity; }
    public Integer getCycleCount() { return cycleCount; }
    public void setCycleCount(Integer cycleCount) { this.cycleCount = cycleCount; }
}
