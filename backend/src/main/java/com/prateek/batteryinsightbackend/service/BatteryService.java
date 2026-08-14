package com.prateek.batteryinsightbackend.service;

import com.prateek.batteryinsightbackend.dto.BatteryResponse;
import com.prateek.batteryinsightbackend.entity.Battery;
import com.prateek.batteryinsightbackend.repository.BatteryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BatteryService {
    private final BatteryRepository repository;

    public BatteryService(BatteryRepository repository) { this.repository = repository; }

    public List<BatteryResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public BatteryResponse get(String batteryId) {
        Battery b = repository.findByBatteryId(batteryId)
                .orElseThrow(() -> new IllegalArgumentException("Battery not found: " + batteryId));
        return toResponse(b);
    }

    public Battery saveOrUpdate(String batteryId, String chemistry, Double capacity, Integer cycles) {
        Battery b = repository.findByBatteryId(batteryId).orElseGet(Battery::new);
        b.setBatteryId(batteryId); b.setChemistry(chemistry); b.setCapacity(capacity); b.setCycleCount(cycles);
        return repository.save(b);
    }

    private BatteryResponse toResponse(Battery b) {
        return new BatteryResponse(b.getBatteryId(), b.getChemistry(), b.getCapacity(), b.getCycleCount());
    }
}
