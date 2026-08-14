import EmptyState from '../common/EmptyState'

export default function AnomalyList({ anomalies = [] }) {
  if (!anomalies || anomalies.length === 0) {
    return <EmptyState message="No anomalies detected" />
  }

  return (
    <div className="space-y-4">
      <h3 className="text-text-primary font-medium text-lg">Anomalies</h3>
      {anomalies.map((anomaly, idx) => (
        <div key={idx} className="bg-bg-card border border-border-color rounded p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Type</p>
              <p className="text-text-primary font-semibold">{anomaly.type}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Severity</p>
              <p className="text-text-primary font-semibold">{anomaly.severity}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Parameter</p>
              <p className="text-text-primary">{anomaly.parameter}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Observed Value</p>
              <p className="text-text-primary">{anomaly.observedValue}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-color">
            <p className="text-text-secondary text-sm font-medium mb-1">Explanation</p>
            <p className="text-text-primary text-sm">{anomaly.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
