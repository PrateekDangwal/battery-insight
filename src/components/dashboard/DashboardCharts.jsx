import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#A0A0A0', '#666666', '#292929']

export default function DashboardCharts({ riskCount, healthScore, anomalies }) {
  const riskData = [
    { name: 'Low Risk', value: riskCount?.LOW || 0 },
    { name: 'Medium Risk', value: riskCount?.MEDIUM || 0 },
    { name: 'High Risk', value: riskCount?.HIGH || 0 },
  ]

  const healthData = [
    { name: 'Healthy', value: healthScore >= 80 ? 1 : 0 },
    { name: 'Monitor', value: healthScore >= 60 && healthScore < 80 ? 1 : 0 },
    { name: 'Warning', value: healthScore < 60 ? 1 : 0 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Risk Distribution */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
            <XAxis dataKey="name" stroke="#A0A0A0" />
            <YAxis stroke="#A0A0A0" />
            <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #292929', color: '#F5F5F5' }} />
            <Bar dataKey="value" fill="#A0A0A0" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Health Distribution */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">Health Score Snapshot</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[{ name: 'Score', value: healthScore }]}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill="#A0A0A0" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-2xl font-semibold text-text-primary">{healthScore.toFixed(1)}</p>
          <p className="text-xs text-text-muted">Average Health Score</p>
        </div>
      </div>
    </div>
  )
}
