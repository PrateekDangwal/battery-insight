import { Link } from 'react-router-dom'
import Table from '../common/Table'
import { formatDate } from '../../utils/formatting'

export default function BatteryTable({ batteries, loading, error, empty }) {
  const columns = [
    {
      key: 'id',
      label: 'Battery ID',
      render: (row) => (
        <Link
          to={`/batteries/${row.id}`}
          className="text-text-primary hover:text-text-secondary truncate max-w-xs"
        >
          {row.id.substring(0, 12)}...
        </Link>
      ),
    },
    {
      key: 'chemistry',
      label: 'Chemistry',
    },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (row) => formatDate(row.createdAt),
    },
  ]

  return (
    <Table
      columns={columns}
      data={batteries}
      loading={loading}
      error={error}
      empty={empty}
    />
  )
}
