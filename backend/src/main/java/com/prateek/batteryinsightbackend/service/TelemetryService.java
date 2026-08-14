package com.prateek.batteryinsightbackend.service;

import com.prateek.batteryinsightbackend.dto.TelemetryRequest;
import com.prateek.batteryinsightbackend.dto.TelemetryResponse;
import com.prateek.batteryinsightbackend.entity.Telemetry;
import com.prateek.batteryinsightbackend.repository.TelemetryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TelemetryService {
    private final TelemetryRepository repository;

    public TelemetryService(TelemetryRepository repository) { this.repository = repository; }

    public TelemetryResponse create(TelemetryRequest r) {
        Telemetry t = new Telemetry();
        t.setBatteryId(r.getBatteryId()); t.setTimestamp(r.getTimestamp());
        t.setSoc(r.getSoc()); t.setSoh(r.getSoh()); t.setVoltage(r.getVoltage());
        t.setCurrent(r.getCurrent()); t.setTemperature(r.getTemperature());
        t.setCycleCount(r.getCycleCount()); t.setCapacity(r.getCapacity()); t.setChemistry(r.getChemistry());
        return toResponse(repository.save(t));
    }

    public List<TelemetryResponse> getByBattery(String batteryId) {
        return repository.findByBatteryIdOrderByTimestampDesc(batteryId).stream().map(this::toResponse).toList();
    }

    public Telemetry latest(String batteryId) {
        return repository.findByBatteryIdOrderByTimestampDesc(batteryId).stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No telemetry found for battery: " + batteryId));
    }

    private TelemetryResponse toResponse(Telemetry t) {
        TelemetryResponse r = new TelemetryResponse();
        r.setId(t.getId()); r.setBatteryId(t.getBatteryId()); r.setTimestamp(t.getTimestamp());
        r.setSoc(t.getSoc()); r.setSoh(t.getSoh()); r.setVoltage(t.getVoltage());
        r.setCurrent(t.getCurrent()); r.setTemperature(t.getTemperature());
        r.setCycleCount(t.getCycleCount()); r.setCapacity(t.getCapacity()); r.setChemistry(t.getChemistry());
        return r;
    }
}
