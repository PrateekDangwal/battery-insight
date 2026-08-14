package com.prateek.batteryinsightbackend.repository;

import com.prateek.batteryinsightbackend.entity.Battery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BatteryRepository extends JpaRepository<Battery, Long> {
    Optional<Battery> findByBatteryId(String batteryId);
    boolean existsByBatteryId(String batteryId);
}
