import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import StatCard from '../components/dashboard/StatCard'
import DashboardCharts from '../components/dashboard/DashboardCharts'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'
import { getDashboard, parseError } from '../services/api'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getDashboard()
        setData(result)
        setError(null)
      } catch (err) {
        setError(parseError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Layout><Loading /></Layout>

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-1">Dashboard</h1>
          <p className="text-text-secondary">Fleet overview and analytics</p>
        </div>

        {error && <ErrorMessage title="Error Loading Dashboard" message={error.message} />}

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Total Batteries" value={data.totalBatteries} />
              <StatCard
                label="Average Health Score"
                value={data.averageHealthScore.toFixed(1)}
                subtext="/100"
              />
              <StatCard label="Anomalies (24h)" value={data.anomalyCountLast24h} />
              <StatCard label="Total Risk Cases" value={
                (data.riskCount?.LOW || 0) +
                (data.riskCount?.MEDIUM || 0) +
                (data.riskCount?.HIGH || 0)
              } />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Low Risk" value={data.riskCount?.LOW || 0} />
              <StatCard label="Medium Risk" value={data.riskCount?.MEDIUM || 0} />
              <StatCard label="High Risk" value={data.riskCount?.HIGH || 0} />
            </div>

            <DashboardCharts
              riskCount={data.riskCount}
              healthScore={data.averageHealthScore}
              anomalies={data.anomalyCountLast24h}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
