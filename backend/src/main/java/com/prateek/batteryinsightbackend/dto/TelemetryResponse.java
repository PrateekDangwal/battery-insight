package com.prateek.batteryinsightbackend.dto;

import java.time.LocalDateTime;

public class TelemetryResponse {
    private Long id; private String batteryId; private LocalDateTime timestamp;
    private Double soc, soh, voltage, current, temperature, capacity;
    private Integer cycleCount; private String chemistry;

    public TelemetryResponse() {}
    public Long getId() { return id; } public void setId(Long v) { id = v; }
    public String getBatteryId() { return batteryId; } public void setBatteryId(String v) { batteryId = v; }
    public LocalDateTime getTimestamp() { return timestamp; } public void setTimestamp(LocalDateTime v) { timestamp = v; }
    public Double getSoc() { return soc; } public void setSoc(Double v) { soc = v; }
    public Double getSoh() { return soh; } public void setSoh(Double v) { soh = v; }
    public Double getVoltage() { return voltage; } public void setVoltage(Double v) { voltage = v; }
    public Double getCurrent() { return current; } public void setCurrent(Double v) { current = v; }
    public Double getTemperature() { return temperature; } public void setTemperature(Double v) { temperature = v; }
    public Integer getCycleCount() { return cycleCount; } public void setCycleCount(Integer v) { cycleCount = v; }
    public Double getCapacity() { return capacity; } public void setCapacity(Double v) { capacity = v; }
    public String getChemistry() { return chemistry; } public void setChemistry(String v) { chemistry = v; }
}
