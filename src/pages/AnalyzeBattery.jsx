import { useState } from 'react'
import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import BatteryForm from '../components/battery/BatteryForm'
import HealthScore from '../components/analysis/HealthScore'
import AnomalyList from '../components/analysis/AnomalyList'
import RecommendationList from '../components/analysis/RecommendationList'
import ErrorMessage from '../components/common/ErrorMessage'
import { createTelemetry, analyzeBattery, getBattery, uploadTelemetry, parseError } from '../services/api'
import { validateBatteryId } from '../utils/validation'

const MODES = { SELECT: 'select', MANUAL: 'manual', EXISTING: 'existing', RESULT: 'result', CSV: 'csv', CSV_SUCCESS: 'csv_success' }

export default function AnalyzeBattery() {
  const [mode, setMode] = useState(MODES.SELECT)
  const [batteryId, setBatteryId] = useState('')
  const [batteryIdError, setBatteryIdError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [csvFile, setCsvFile] = useState(null)
  const [csvResult, setCsvResult] = useState(null)

  const handleManualTelemetry = async (data) => {
    try {
      setLoading(true); setError(null)
      await createTelemetry(data)
      const result = await analyzeBattery(data.batteryId)
      setAnalysisResult(result); setMode(MODES.RESULT)
    } catch (err) { setError(parseError(err)) } finally { setLoading(false) }
  }

  const handleAnalyzeExisting = async (e) => {
    e.preventDefault()
    const validation = validateBatteryId(batteryId)
    if (validation) { setBatteryIdError(validation); return }
    try {
      setLoading(true); setError(null); setBatteryIdError(null)
      await getBattery(batteryId)
      const result = await analyzeBattery(batteryId)
      setAnalysisResult(result); setMode(MODES.RESULT)
    } catch (err) { setError(parseError(err)) } finally { setLoading(false) }
  }

  const handleCsvUpload = async (e) => {
    e.preventDefault()
    if (!csvFile) { setError({ message: 'Please select a CSV file' }); return }
    try {
      setLoading(true); setError(null)
      const result = await uploadTelemetry(csvFile)
      setCsvResult(result); setCsvFile(null); setMode(MODES.CSV_SUCCESS)
    } catch (err) { setError(parseError(err)) } finally { setLoading(false) }
  }

  const handleReset = () => {
    setMode(MODES.SELECT); setBatteryId(''); setBatteryIdError(null); setError(null)
    setAnalysisResult(null); setCsvFile(null); setCsvResult(null)
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        <div><h1 className="text-3xl font-semibold text-text-primary mb-1">Analyze Battery</h1><p className="text-text-secondary">Choose how to analyze a battery</p></div>
        {error && <ErrorMessage title="Analysis Error" message={typeof error.message === 'string' ? error.message : 'An error occurred during analysis'} />}

        {mode === MODES.SELECT && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[[MODES.MANUAL, 'Manual Telemetry', 'Enter telemetry data and analyze'], [MODES.EXISTING, 'Existing Battery', 'Analyze an existing battery by ID'], [MODES.CSV, 'CSV Upload', 'Bulk upload telemetry data']].map(([target, title, description]) => (
              <button key={target} onClick={() => { setMode(target); setError(null) }} className="bg-bg-card border border-border-color rounded p-8 hover:bg-hover-color transition-colors text-left">
                <h3 className="text-text-primary font-semibold mb-2">{title}</h3><p className="text-text-secondary text-sm">{description}</p>
              </button>
            ))}
          </div>
        )}

        {mode === MODES.MANUAL && <div className="bg-bg-card border border-border-color rounded p-8">
          <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold text-text-primary">Manual Telemetry</h2><Button variant="secondary" size="sm" onClick={handleReset} disabled={loading}>Back</Button></div>
          <BatteryForm onSubmit={handleManualTelemetry} loading={loading} />
        </div>}

        {mode === MODES.EXISTING && <div className="bg-bg-card border border-border-color rounded p-8">
          <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold text-text-primary">Analyze Existing Battery</h2><Button variant="secondary" size="sm" onClick={handleReset} disabled={loading}>Back</Button></div>
          <form onSubmit={handleAnalyzeExisting} className="space-y-6">
            <Input label="Battery ID" placeholder="Enter battery ID" value={batteryId} onChange={(e) => { setBatteryId(e.target.value); setBatteryIdError(null) }} error={batteryIdError} required />
            <Button type="submit" loading={loading} size="lg">Analyze Battery</Button>
          </form>
        </div>}

        {mode === MODES.CSV && <div className="bg-bg-card border border-border-color rounded p-8">
          <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold text-text-primary">Upload CSV</h2><Button variant="secondary" size="sm" onClick={handleReset} disabled={loading}>Back</Button></div>
          <form onSubmit={handleCsvUpload} className="space-y-6">
            <div className="flex flex-col gap-4"><label className="text-sm font-medium text-text-secondary">CSV File</label>
              <div className="border-2 border-dashed border-border-color rounded p-8 text-center hover:bg-hover-color transition-colors cursor-pointer">
                <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} className="w-full cursor-pointer" />
                <p className="text-text-secondary text-sm mt-2">{csvFile ? csvFile.name : 'Select a CSV file'}</p>
              </div>
              <p className="text-text-muted text-xs">Required columns: batteryId, timestamp, soc, soh, voltage, current, temperature, cycleCount, capacity, chemistry</p>
            </div>
            <Button type="submit" loading={loading} size="lg" disabled={!csvFile}>Upload CSV</Button>
          </form>
        </div>}

        {mode === MODES.CSV_SUCCESS && csvResult && <div className="bg-bg-card border border-border-color rounded p-8">
          <div className="text-center"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-elevated border border-border-color flex items-center justify-center"><span className="text-2xl text-text-primary font-semibold">✓</span></div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Upload Successful</h2>
          <p className="text-text-secondary mb-6">Successfully ingested <span className="font-semibold">{csvResult.ingested}</span> records</p>
          <Button onClick={handleReset} size="lg">Analyze Another Battery</Button></div>
        </div>}

        {mode === MODES.RESULT && analysisResult && <div className="space-y-8">
          <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-text-primary mb-1">Analysis Result</h2><p className="text-text-secondary text-sm">Battery ID: {analysisResult.batteryId}</p></div><Button variant="secondary" onClick={handleReset}>Analyze Another</Button></div>
          <HealthScore score={analysisResult.healthScore} status={analysisResult.healthStatus} riskLevel={analysisResult.riskLevel} />
          <div className="space-y-8"><AnomalyList anomalies={analysisResult.anomalies} /><RecommendationList recommendations={analysisResult.recommendations} /></div>
        </div>}
      </div>
    </Layout>
  )
}
