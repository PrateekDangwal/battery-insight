package com.prateek.batteryinsightbackend.dto;

import java.util.List;

public class AnalysisResponse {
    private String batteryId;
    private Integer healthScore;
    private String healthStatus;
    private String riskLevel;
    private List<String> anomalies;
    private List<String> recommendations;

    public AnalysisResponse() {}
    public AnalysisResponse(String batteryId, Integer healthScore, String healthStatus,
                            String riskLevel, List<String> anomalies, List<String> recommendations) {
        this.batteryId = batteryId; this.healthScore = healthScore; this.healthStatus = healthStatus;
        this.riskLevel = riskLevel; this.anomalies = anomalies; this.recommendations = recommendations;
    }
    public String getBatteryId() { return batteryId; } public void setBatteryId(String v) { batteryId = v; }
    public Integer getHealthScore() { return healthScore; } public void setHealthScore(Integer v) { healthScore = v; }
    public String getHealthStatus() { return healthStatus; } public void setHealthStatus(String v) { healthStatus = v; }
    public String getRiskLevel() { return riskLevel; } public void setRiskLevel(String v) { riskLevel = v; }
    public List<String> getAnomalies() { return anomalies; } public void setAnomalies(List<String> v) { anomalies = v; }
    public List<String> getRecommendations() { return recommendations; } public void setRecommendations(List<String> v) { recommendations = v; }
}
