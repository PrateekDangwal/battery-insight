package com.prateek.batteryinsightbackend.controller;

import com.prateek.batteryinsightbackend.dto.AnalysisResponse;
import com.prateek.batteryinsightbackend.entity.Analysis;
import com.prateek.batteryinsightbackend.service.AnalysisService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analysis")

public class AnalysisController {
    private final AnalysisService service;

    public AnalysisController(AnalysisService service) { this.service = service; }

    @PostMapping("/{batteryId}")
    public AnalysisResponse analyze(@PathVariable String batteryId) { return service.analyze(batteryId); }

    @GetMapping("/{batteryId}")
    public AnalysisResponse latest(@PathVariable String batteryId) { return service.latest(batteryId); }

    @GetMapping("/{batteryId}/history")
    public List<AnalysisResponse> batteryHistory(@PathVariable String batteryId) { return service.forBattery(batteryId); }

    @GetMapping("/history")
    public Map<String, Object> history(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Analysis> p = service.history(page, size);
        return Map.of(
            "content", p.getContent(),
            "page", p.getNumber(),
            "size", p.getSize(),
            "totalElements", p.getTotalElements(),
            "totalPages", p.getTotalPages()
        );
    }
}
