# Battery Insight

A full-stack Battery Health Analyzer that processes battery telemetry data and generates a transparent, rule-based assessment of battery health, risk, warnings, and recommendations.

The project is designed as an engineering prototype for understanding how battery telemetry can be collected, stored, analyzed, and presented through a web dashboard.

---

## Overview

Battery Insight allows users to analyze battery data using parameters such as:

- Battery ID
- Chemistry
- State of Charge (SOC)
- State of Health (SOH)
- Voltage
- Current
- Temperature
- Capacity
- Cycle Count

The backend processes this information through a configurable rule-based analysis engine and generates:

- Health Score
- Health Status
- Risk Level
- Warnings / Anomalies
- Recommendations
- Analysis History

---

## Architecture

```text
                  Battery Data
                       |
                       v
                REST API Layer
                       |
                       v
              Spring Boot Backend
                       |
          +------------+------------+
          |                         |
          v                         v
   Analysis Engine              Database
          |                         |
          +------------+------------+
                       |
                       v
                REST API Response
                       |
                       v
                 React Frontend
                       |
                       v
               Battery Dashboard