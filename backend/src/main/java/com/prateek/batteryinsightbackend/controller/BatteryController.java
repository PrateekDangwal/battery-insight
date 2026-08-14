package com.prateek.batteryinsightbackend.controller;

import com.prateek.batteryinsightbackend.dto.BatteryResponse;
import com.prateek.batteryinsightbackend.service.BatteryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/batteries")

public class BatteryController {
    private final BatteryService service;
    public BatteryController(BatteryService service) { this.service = service; }

    @GetMapping
    public List<BatteryResponse> all() { return service.getAll(); }

    @GetMapping("/{batteryId}")
    public BatteryResponse one(@PathVariable String batteryId) { return service.get(batteryId); }
}
