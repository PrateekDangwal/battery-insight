package com.prateek.batteryinsightbackend.repository;

import com.prateek.batteryinsightbackend.entity.Analysis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    List<Analysis> findByBatteryIdOrderByAnalyzedAtDesc(String batteryId);
    Page<Analysis> findAllByOrderByAnalyzedAtDesc(Pageable pageable);
    Optional<Analysis> findTopByBatteryIdOrderByAnalyzedAtDesc(String batteryId);
}
