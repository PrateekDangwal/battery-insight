export default function HealthScore({ score, status, riskLevel }) {
  const getStatusColor = () => {
    if (status === 'HEALTHY') return 'bg-bg-elevated border-border-color'
    if (status === 'MONITOR') return 'bg-bg-elevated border-border-color'
    if (status === 'WARNING') return 'bg-bg-elevated border-border-color'
    return 'bg-bg-elevated border-border-color'
  }

  return (
    <div className={`${getStatusColor()} border rounded p-8 mb-8`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Score */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-bg-card border border-border-color flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-semibold text-text-primary">{score}</p>
              <p className="text-xs text-text-muted">/100</p>
            </div>
          </div>
          <p className="text-text-secondary text-sm">Health Score</p>
        </div>

        {/* Status */}
        <div className="text-center flex flex-col justify-center">
          <p className="text-text-secondary text-xs mb-2 uppercase tracking-wide">Health Status</p>
          <p className="text-2xl font-semibold text-text-primary">{status}</p>
        </div>

        {/* Risk Level */}
        <div className="text-center flex flex-col justify-center">
          <p className="text-text-secondary text-xs mb-2 uppercase tracking-wide">Risk Level</p>
          <p className="text-2xl font-semibold text-text-primary">{riskLevel}</p>
        </div>
      </div>
    </div>
  )
}
