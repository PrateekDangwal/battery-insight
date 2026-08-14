import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import BatteryTable from '../components/battery/BatteryTable'
import Input from '../components/common/Input'
import Pagination from '../components/common/Pagination'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import { getBatteries, parseError } from '../services/api'

export default function Batteries() {
  const [batteries, setBatteries] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBatteries = async (pageNum = 0) => {
    try {
      setLoading(true)
      const result = await getBatteries(pageNum, 20, search)
      setBatteries(result.content || [])
      setPage(result.page || 0)
      setTotalPages(result.totalPages || 0)
      setError(null)
    } catch (err) {
      setError(parseError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(0)
    fetchBatteries(0)
  }, [search])

  const handlePageChange = (newPage) => {
    fetchBatteries(newPage)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-1">Batteries</h1>
          <p className="text-text-secondary">Search and inspect batteries</p>
        </div>

        <Input
          label="Search Batteries"
          placeholder="Search by ID or chemistry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {error && <ErrorMessage title="Error Loading Batteries" message={error.message} />}

        {loading ? (
          <Loading />
        ) : batteries.length === 0 ? (
          <EmptyState message={search ? 'No batteries found' : 'No batteries available'} />
        ) : (
          <>
            <BatteryTable batteries={batteries} loading={false} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
