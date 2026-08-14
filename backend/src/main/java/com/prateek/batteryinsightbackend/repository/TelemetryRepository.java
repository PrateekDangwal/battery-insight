package com.prateek.batteryinsightbackend.repository;

import com.prateek.batteryinsightbackend.entity.Telemetry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TelemetryRepository extends JpaRepository<Telemetry, Long> {
    List<Telemetry> findByBatteryIdOrderByTimestampDesc(String batteryId);
}
