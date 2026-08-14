export default function StatCard({ label, value, subtext = '' }) {
  return (
    <div className="bg-bg-card border border-border-color rounded p-6">
      <p className="text-text-secondary text-sm font-medium mb-2">{label}</p>
      <p className="text-3xl font-semibold text-text-primary mb-1">{value}</p>
      {subtext && <p className="text-xs text-text-muted">{subtext}</p>}
    </div>
  )
}
