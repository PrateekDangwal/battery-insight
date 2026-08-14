package com.prateek.batteryinsightbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class TelemetryRequest {
    @NotBlank private String batteryId;
    @NotNull private LocalDateTime timestamp;
    @NotNull private Double soc;
    @NotNull private Double soh;
    @NotNull private Double voltage;
    @NotNull private Double current;
    @NotNull private Double temperature;
    @NotNull private Integer cycleCount;
    @NotNull private Double capacity;
    private String chemistry;

    public TelemetryRequest() {}
    public String getBatteryId() { return batteryId; }
    public void setBatteryId(String batteryId) { this.batteryId = batteryId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Double getSoc() { return soc; }
    public void setSoc(Double soc) { this.soc = soc; }
    public Double getSoh() { return soh; }
    public void setSoh(Double soh) { this.soh = soh; }
    public Double getVoltage() { return voltage; }
    public void setVoltage(Double voltage) { this.voltage = voltage; }
    public Double getCurrent() { return current; }
    public void setCurrent(Double current) { this.current = current; }
    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }
    public Integer getCycleCount() { return cycleCount; }
    public void setCycleCount(Integer cycleCount) { this.cycleCount = cycleCount; }
    public Double getCapacity() { return capacity; }
    public void setCapacity(Double capacity) { this.capacity = capacity; }
    public String getChemistry() { return chemistry; }
    public void setChemistry(String chemistry) { this.chemistry = chemistry; }
}
