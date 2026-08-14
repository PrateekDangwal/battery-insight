package com.prateek.batteryinsightbackend.analyzer;

import com.prateek.batteryinsightbackend.dto.AnalysisResponse;
import com.prateek.batteryinsightbackend.entity.Telemetry;
import java.util.ArrayList;
import java.util.List;

public class BatteryHealthAnalyzer {

    public AnalysisResponse analyze(Telemetry t) {
        List<String> anomalies = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();

        int score = 100;

        if (t.getSoh() != null) {
            if (t.getSoh() < 60) { score -= 35; anomalies.add("SOH is critically low."); recommendations.add("Inspect battery degradation and consider replacement planning."); }
            else if (t.getSoh() < 80) { score -= 20; anomalies.add("SOH is below the prototype monitoring threshold."); recommendations.add("Monitor degradation trend more frequently."); }
            else if (t.getSoh() < 90) { score -= 10; }
        }

        if (t.getTemperature() != null) {
            if (t.getTemperature() > 60 || t.getTemperature() < -10) { score -= 30; anomalies.add("Temperature is outside the configured prototype operating range."); recommendations.add("Check thermal management and operating conditions."); }
            else if (t.getTemperature() > 45) { score -= 15; anomalies.add("Temperature is elevated."); recommendations.add("Monitor cooling performance."); }
        }

        if (t.getCycleCount() != null && t.getCycleCount() > 1500) {
            score -= 15; anomalies.add("Cycle count is high under the prototype rule set."); recommendations.add("Review cycle-life trend and SOH history.");
        }

        if (t.getSoc() != null && (t.getSoc() < 10 || t.getSoc() > 95)) {
            score -= 5; anomalies.add("SOC is near an operating boundary."); recommendations.add("Avoid prolonged operation at extreme SOC levels.");
        }

        if (t.getVoltage() != null && (t.getVoltage() < 2.5 || t.getVoltage() > 4.3)) {
            score -= 15; anomalies.add("Voltage is outside the configured prototype cell range."); recommendations.add("Verify voltage measurement and battery operating conditions.");
        }

        score = Math.max(0, Math.min(100, score));

        String healthStatus = score >= 80 ? "GOOD" : score >= 60 ? "MONITOR" : "WARNING";
        int riskValue = 100 - score;
        String riskLevel = riskValue <= 30 ? "LOW" : riskValue <= 60 ? "MEDIUM" : "HIGH";

        if (recommendations.isEmpty()) recommendations.add("Continue routine monitoring of battery telemetry.");
        return new AnalysisResponse(t.getBatteryId(), score, healthStatus, riskLevel, anomalies, recommendations);
    }
}
