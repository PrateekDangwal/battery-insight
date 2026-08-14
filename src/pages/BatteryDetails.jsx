import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import TelemetryCharts from '../components/charts/TelemetryCharts'
import Pagination from '../components/common/Pagination'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import { getBattery, getTelemetry, parseError } from '../services/api'
import { formatDate } from '../utils/formatting'

export default function BatteryDetails() {
  const { id } = useParams()
  const [battery, setBattery] = useState(null)
  const [telemetry, setTelemetry] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const batteryData = await getBattery(id)
        setBattery(batteryData)

        const telemetryData = await getTelemetry(id, 0, 20)
        setTelemetry(telemetryData.content || [])
        setPage(telemetryData.page || 0)
        setTotalPages(telemetryData.totalPages || 0)

        setError(null)
      } catch (err) {
        setError(parseError(err))
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handlePageChange = async (newPage) => {
    try {
      const telemetryData = await getTelemetry(id, newPage, 20)
      setTelemetry(telemetryData.content || [])
      setPage(telemetryData.page || 0)
      setTotalPages(telemetryData.totalPages || 0)
    } catch (err) {
      setError(parseError(err))
    }
  }

  const latestTelemetry = telemetry.length > 0 ? telemetry[telemetry.length - 1] : null

  if (loading) return <Layout><Loading /></Layout>

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-1">Battery Details</h1>
          <p className="text-text-secondary">Inspect battery telemetry and history</p>
        </div>

        {error && <ErrorMessage title="Error Loading Battery" message={error.message} />}

        {battery && (
          <>
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-bg-card border border-border-color rounded p-6">
                <p className="text-text-secondary text-sm font-medium mb-2">Battery ID</p>
                <p className="text-text-primary font-semibold break-all text-sm">{battery.id}</p>
              </div>
              <div className="bg-bg-card border border-border-color rounded p-6">
                <p className="text-text-secondary text-sm font-medium mb-2">Chemistry</p>
                <p className="text-text-primary font-semibold">{battery.chemistry}</p>
              </div>
              <div className="bg-bg-card border border-border-color rounded p-6">
                <p className="text-text-secondary text-sm font-medium mb-2">Created</p>
                <p className="text-text-primary">{formatDate(battery.createdAt)}</p>
              </div>
            </div>

            {/* Latest Telemetry */}
            {latestTelemetry && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">SOC</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.soc.toFixed(1)}%</p>
                </div>
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">SOH</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.soh.toFixed(1)}%</p>
                </div>
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">Temperature</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.temperature.toFixed(1)}°C</p>
                </div>
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">Voltage</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.voltage.toFixed(2)}V</p>
                </div>
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">Current</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.current.toFixed(2)}A</p>
                </div>
                <div className="bg-bg-card border border-border-color rounded p-6">
                  <p className="text-text-secondary text-xs font-medium mb-2">Cycle Count</p>
                  <p className="text-2xl font-semibold text-text-primary">{latestTelemetry.cycleCount}</p>
                </div>
              </div>
            )}

            {/* Charts */}
            <TelemetryCharts telemetry={telemetry} />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
