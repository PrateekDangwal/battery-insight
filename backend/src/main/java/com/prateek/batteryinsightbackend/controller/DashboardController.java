package com.prateek.batteryinsightbackend.controller;

import com.prateek.batteryinsightbackend.entity.Analysis;
import com.prateek.batteryinsightbackend.repository.AnalysisRepository;
import com.prateek.batteryinsightbackend.repository.BatteryRepository;
import com.prateek.batteryinsightbackend.repository.TelemetryRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    private final BatteryRepository batteries;
    private final TelemetryRepository telemetry;
    private final AnalysisRepository analyses;

    public DashboardController(
            BatteryRepository batteries,
            TelemetryRepository telemetry,
            AnalysisRepository analyses) {

        this.batteries = batteries;
        this.telemetry = telemetry;
        this.analyses = analyses;
    }

    @GetMapping
    public Map<String, Object> dashboard() {

        List<Analysis> allAnalyses = analyses.findAll();

        double averageHealthScore = allAnalyses.stream()
                .map(Analysis::getHealthScore)
                .filter(score -> score != null)
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);

        Map<String, Integer> riskCount = new LinkedHashMap<>();

        riskCount.put("LOW", 0);
        riskCount.put("MEDIUM", 0);
        riskCount.put("HIGH", 0);

        for (Analysis analysis : allAnalyses) {

            String risk = analysis.getRiskLevel();

            if (risk != null && riskCount.containsKey(risk)) {
                riskCount.put(
                        risk,
                        riskCount.get(risk) + 1
                );
            }
        }

        LocalDateTime last24Hours =
                LocalDateTime.now().minusHours(24);

        int anomalyCountLast24h = allAnalyses.stream()
                .filter(a -> a.getAnalyzedAt() != null)
                .filter(a -> a.getAnalyzedAt().isAfter(last24Hours))
                .mapToInt(a -> {

                    int count = 0;

                    if (a.getAnomalies() != null &&
                            !a.getAnomalies().equals("[]")) {

                        count = 1;
                    }

                    return count;
                })
                .sum();

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("totalBatteries", batteries.count());
        result.put("averageHealthScore", averageHealthScore);
        result.put("anomalyCountLast24h", anomalyCountLast24h);
        result.put("riskCount", riskCount);

        return result;
    }
}