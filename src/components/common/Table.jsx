export default function Table({ columns, data, loading, empty = false, error = null }) {
  if (loading) {
    return <div className="text-center py-8 text-text-secondary">Loading table...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (empty || !data || data.length === 0) {
    return <div className="text-center py-8 text-text-secondary">No data to display</div>
  }

  return (
    <div className="overflow-x-auto border border-border-color rounded">
      <table className="w-full text-sm">
        <thead className="bg-bg-elevated border-b border-border-color">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-medium text-text-secondary">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-border-color hover:bg-hover-color">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-text-primary">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
