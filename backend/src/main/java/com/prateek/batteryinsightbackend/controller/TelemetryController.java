package com.prateek.batteryinsightbackend.controller;

import com.prateek.batteryinsightbackend.dto.TelemetryRequest;
import com.prateek.batteryinsightbackend.dto.TelemetryResponse;
import com.prateek.batteryinsightbackend.service.BatteryService;
import com.prateek.batteryinsightbackend.service.TelemetryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api/telemetry")

public class TelemetryController {
    private final TelemetryService telemetryService;
    private final BatteryService batteryService;

    public TelemetryController(TelemetryService telemetryService, BatteryService batteryService) {
        this.telemetryService = telemetryService; this.batteryService = batteryService;
    }

    @GetMapping("/{batteryId}")
    public List<TelemetryResponse> byBattery(@PathVariable String batteryId) {
        return telemetryService.getByBattery(batteryId);
    }

    @PostMapping
    public TelemetryResponse create(@Valid @RequestBody TelemetryRequest request) {
        batteryService.saveOrUpdate(request.getBatteryId(), request.getChemistry(), request.getCapacity(), request.getCycleCount());
        return telemetryService.create(request);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file) {
        Map<String, Object> result = new HashMap<>();
        result.put("filename", file.getOriginalFilename());
        result.put("ingested", 0);
        result.put("message", "CSV endpoint is available; CSV row parsing can be added after the backend contract is finalized.");
        return ResponseEntity.ok(result);
    }
}
