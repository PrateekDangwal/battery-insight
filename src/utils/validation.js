export const validateTelemetry = (data) => {
  const errors = {}

  if (!data.batteryId || data.batteryId.trim() === '') {
    errors.batteryId = 'Battery ID is required'
  }

  if (data.soc === '' || data.soc === null || data.soc === undefined) {
    errors.soc = 'SOC is required'
  } else if (isNaN(data.soc) || data.soc < 0 || data.soc > 100) {
    errors.soc = 'SOC must be between 0 and 100'
  }

  if (data.soh === '' || data.soh === null || data.soh === undefined) {
    errors.soh = 'SOH is required'
  } else if (isNaN(data.soh) || data.soh < 0 || data.soh > 100) {
    errors.soh = 'SOH must be between 0 and 100'
  }

  if (data.voltage === '' || data.voltage === null || data.voltage === undefined) {
    errors.voltage = 'Voltage is required'
  } else if (isNaN(data.voltage) || data.voltage <= 0) {
    errors.voltage = 'Voltage must be positive'
  }

  if (data.current === '' || data.current === null || data.current === undefined) {
    errors.current = 'Current is required'
  } else if (isNaN(data.current)) {
    errors.current = 'Current must be a number'
  }

  if (data.temperature === '' || data.temperature === null || data.temperature === undefined) {
    errors.temperature = 'Temperature is required'
  } else if (isNaN(data.temperature) || data.temperature < -40 || data.temperature > 85) {
    errors.temperature = 'Temperature must be between -40 and 85°C'
  }

  if (data.cycleCount === '' || data.cycleCount === null || data.cycleCount === undefined) {
    errors.cycleCount = 'Cycle Count is required'
  } else if (isNaN(data.cycleCount) || data.cycleCount < 0) {
    errors.cycleCount = 'Cycle Count must be 0 or greater'
  }

  if (data.capacity === '' || data.capacity === null || data.capacity === undefined) {
    errors.capacity = 'Capacity is required'
  } else if (isNaN(data.capacity) || data.capacity <= 0) {
    errors.capacity = 'Capacity must be positive'
  }

  if (!data.chemistry || data.chemistry.trim() === '') {
    errors.chemistry = 'Chemistry is required'
  }

  if (!data.timestamp || data.timestamp.trim() === '') {
    errors.timestamp = 'Timestamp is required'
  } else if (isNaN(Date.parse(data.timestamp))) {
    errors.timestamp = 'Timestamp must be a valid ISO date'
  }

  return errors
}

export const validateBatteryId = (batteryId) => {
  if (!batteryId || batteryId.trim() === '') {
    return 'Battery ID is required'
  }
  return null
}
