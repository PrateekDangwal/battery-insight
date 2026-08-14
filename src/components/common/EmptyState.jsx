export default function EmptyState({ message = 'No data available' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
        <span className="text-text-secondary text-2xl">-</span>
      </div>
      <p className="text-text-secondary">{message}</p>
    </div>
  )
}
