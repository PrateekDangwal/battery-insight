import { useState } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import { validateTelemetry } from '../../utils/validation'

export default function BatteryForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    batteryId: '',
    timestamp: new Date().toISOString().split('T')[0] + 'T' + new Date().toISOString().split('T')[1].substring(0, 5),
    soc: '',
    soh: '',
    voltage: '',
    current: '',
    temperature: '',
    cycleCount: '',
    capacity: '',
    chemistry: 'Li-ion',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Convert numeric strings to numbers
    const dataToValidate = {
      ...formData,
      soc: parseFloat(formData.soc),
      soh: parseFloat(formData.soh),
      voltage: parseFloat(formData.voltage),
      current: parseFloat(formData.current),
      temperature: parseFloat(formData.temperature),
      cycleCount: parseInt(formData.cycleCount),
      capacity: parseFloat(formData.capacity),
    }

    const validationErrors = validateTelemetry(dataToValidate)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit(dataToValidate)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Battery ID"
          name="batteryId"
          value={formData.batteryId}
          onChange={handleChange}
          error={errors.batteryId}
          required
        />
        <Input
          label="Chemistry"
          name="chemistry"
          value={formData.chemistry}
          onChange={handleChange}
          error={errors.chemistry}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Timestamp (ISO 8601)"
          name="timestamp"
          type="datetime-local"
          value={formData.timestamp}
          onChange={handleChange}
          error={errors.timestamp}
          required
        />
        <Input
          label="Cycle Count"
          name="cycleCount"
          type="number"
          min="0"
          value={formData.cycleCount}
          onChange={handleChange}
          error={errors.cycleCount}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="SOC (%)"
          name="soc"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.soc}
          onChange={handleChange}
          error={errors.soc}
          required
        />
        <Input
          label="SOH (%)"
          name="soh"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.soh}
          onChange={handleChange}
          error={errors.soh}
          required
        />
        <Input
          label="Temperature (°C)"
          name="temperature"
          type="number"
          min="-40"
          max="85"
          step="0.1"
          value={formData.temperature}
          onChange={handleChange}
          error={errors.temperature}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Voltage (V)"
          name="voltage"
          type="number"
          step="0.01"
          value={formData.voltage}
          onChange={handleChange}
          error={errors.voltage}
          required
        />
        <Input
          label="Current (A)"
          name="current"
          type="number"
          step="0.01"
          value={formData.current}
          onChange={handleChange}
          error={errors.current}
          required
        />
        <Input
          label="Capacity (Ah)"
          name="capacity"
          type="number"
          step="0.01"
          value={formData.capacity}
          onChange={handleChange}
          error={errors.capacity}
          required
        />
      </div>

      <Button type="submit" loading={loading} size="lg">
        Create Telemetry & Analyze
      </Button>
    </form>
  )
}
