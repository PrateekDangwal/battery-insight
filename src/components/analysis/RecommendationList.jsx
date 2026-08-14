import EmptyState from '../common/EmptyState'

export default function RecommendationList({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return <EmptyState message="No recommendations at this time" />
  }

  return (
    <div className="space-y-4">
      <h3 className="text-text-primary font-medium text-lg">Recommendations</h3>
      {recommendations.map((rec, idx) => (
        <div key={idx} className="bg-bg-card border border-border-color rounded p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-bg-elevated rounded-full flex items-center justify-center">
              <span className="text-text-secondary text-sm font-semibold">{idx + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-text-primary">{rec.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
