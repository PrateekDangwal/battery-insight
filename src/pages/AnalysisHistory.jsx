import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import Table from '../components/common/Table'
import Pagination from '../components/common/Pagination'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import { getAnalysisHistory, parseError } from '../services/api'
import { formatDateTime, truncateId } from '../utils/formatting'

export default function AnalysisHistory() {
  const [analyses, setAnalyses] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async (pageNum = 0) => {
    try {
      setLoading(true)
      const result = await getAnalysisHistory(pageNum, 20)
      setAnalyses(result.content || [])
      setPage(result.page || 0)
      setTotalPages(result.totalPages || 0)
      setError(null)
    } catch (err) { setError(parseError(err)) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchHistory(0) }, [])

  const columns = [
    { key: 'batteryId', label: 'Battery ID', render: (row) => truncateId(row.batteryId) },
    { key: 'healthScore', label: 'Health Score', render: (row) => `${row.healthScore} / 100` },
    { key: 'healthStatus', label: 'Status' },
    { key: 'riskLevel', label: 'Risk Level' },
    { key: 'analyzedAt', label: 'Analyzed At', render: (row) => formatDateTime(row.analyzedAt) },
  ]

  return <Layout><div className="space-y-6">
    <div><h1 className="text-3xl font-semibold text-text-primary mb-1">Analysis History</h1><p className="text-text-secondary">View all battery analyses</p></div>
    {error && <ErrorMessage title="Error Loading History" message={error.message} />}
    {loading ? <Loading /> : analyses.length === 0 ? <EmptyState message="No analysis history available" /> : <>
      <Table columns={columns} data={analyses} loading={false} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={fetchHistory} loading={loading} />
    </>}
  </div></Layout>
}
