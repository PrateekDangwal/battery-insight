import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const formatXAxis = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export default function TelemetryCharts({ telemetry = [] }) {
  if (!telemetry || telemetry.length === 0) {
    return <div className="text-center text-text-secondary py-8">No telemetry data available</div>
  }

  // Sort by timestamp
  const sortedData = [...telemetry].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  return (
    <div className="space-y-8">
      {/* SOC Chart */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">SOC Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#A0A0A0"
            />
            <YAxis stroke="#A0A0A0" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #292929', color: '#F5F5F5' }}
              formatter={(value) => `${value.toFixed(2)}%`}
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="soc"
              stroke="#A0A0A0"
              dot={false}
              isAnimationActive={false}
              name="SOC (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SOH Chart */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">SOH Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#A0A0A0"
            />
            <YAxis stroke="#A0A0A0" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #292929', color: '#F5F5F5' }}
              formatter={(value) => `${value.toFixed(2)}%`}
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="soh"
              stroke="#A0A0A0"
              dot={false}
              isAnimationActive={false}
              name="SOH (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature Chart */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">Temperature Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#A0A0A0"
            />
            <YAxis stroke="#A0A0A0" />
            <Tooltip
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #292929', color: '#F5F5F5' }}
              formatter={(value) => `${value.toFixed(2)}°C`}
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#A0A0A0"
              dot={false}
              isAnimationActive={false}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Voltage Chart */}
      <div className="bg-bg-card border border-border-color rounded p-6">
        <h3 className="text-text-primary font-medium mb-4">Voltage Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#A0A0A0"
            />
            <YAxis stroke="#A0A0A0" />
            <Tooltip
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #292929', color: '#F5F5F5' }}
              formatter={(value) => `${value.toFixed(3)}V`}
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#A0A0A0"
              dot={false}
              isAnimationActive={false}
              name="Voltage (V)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
