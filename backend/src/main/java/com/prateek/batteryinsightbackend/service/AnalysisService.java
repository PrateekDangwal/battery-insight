package com.prateek.batteryinsightbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prateek.batteryinsightbackend.analyzer.BatteryHealthAnalyzer;
import com.prateek.batteryinsightbackend.dto.AnalysisResponse;
import com.prateek.batteryinsightbackend.entity.Analysis;
import com.prateek.batteryinsightbackend.entity.Telemetry;
import com.prateek.batteryinsightbackend.repository.AnalysisRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class AnalysisService {
    private final AnalysisRepository repository;
    private final TelemetryService telemetryService;
    private final BatteryHealthAnalyzer analyzer = new BatteryHealthAnalyzer();
    private final ObjectMapper mapper = new ObjectMapper();

    public AnalysisService(AnalysisRepository repository, TelemetryService telemetryService) {
        this.repository = repository; this.telemetryService = telemetryService;
    }

    public AnalysisResponse analyze(String batteryId) {
        Telemetry telemetry = telemetryService.latest(batteryId);
        AnalysisResponse result = analyzer.analyze(telemetry);

        Analysis history = new Analysis();
        history.setBatteryId(result.getBatteryId());
        history.setHealthScore(result.getHealthScore());
        history.setHealthStatus(result.getHealthStatus());
        history.setRiskLevel(result.getRiskLevel());
        history.setAnalyzedAt(LocalDateTime.now());
        try {
            history.setAnomalies(mapper.writeValueAsString(result.getAnomalies()));
            history.setRecommendations(mapper.writeValueAsString(result.getRecommendations()));
        } catch (Exception e) {
            history.setAnomalies("[]"); history.setRecommendations("[]");
        }
        repository.save(history);
        return result;
    }

    public AnalysisResponse latest(String batteryId) {
        Analysis a = repository.findTopByBatteryIdOrderByAnalyzedAtDesc(batteryId)
                .orElseThrow(() -> new IllegalArgumentException("No analysis found for battery: " + batteryId));
        return toResponse(a);
    }

    public List<AnalysisResponse> forBattery(String batteryId) {
        return repository.findByBatteryIdOrderByAnalyzedAtDesc(batteryId).stream().map(this::toResponse).toList();
    }

    public Page<Analysis> history(int page, int size) {
        return repository.findAllByOrderByAnalyzedAtDesc(PageRequest.of(Math.max(0, page), Math.max(1, Math.min(size, 100))));
    }

    private AnalysisResponse toResponse(Analysis a) {
        try {
            List<String> anomalies = mapper.readValue(a.getAnomalies(), new TypeReference<>() {});
            List<String> recommendations = mapper.readValue(a.getRecommendations(), new TypeReference<>() {});
            return new AnalysisResponse(a.getBatteryId(), a.getHealthScore(), a.getHealthStatus(), a.getRiskLevel(), anomalies, recommendations);
        } catch (Exception e) {
            return new AnalysisResponse(a.getBatteryId(), a.getHealthScore(), a.getHealthStatus(), a.getRiskLevel(), Collections.emptyList(), Collections.emptyList());
        }
    }
}
