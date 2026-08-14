import Layout from '../components/layout/Layout'

export default function About() {
  const features = [
    ['Health Score', 'Quantitative assessment of battery health based on telemetry analysis.'],
    ['Risk Classification', 'Categorization of battery risk levels for operational decision-making.'],
    ['Anomaly Detection', 'Identification of abnormal telemetry patterns and threshold violations.'],
    ['Recommendations', 'Actionable guidance based on detected anomalies and health assessment.'],
    ['Telemetry Visualization', 'Time-series charts for SOC, SOH, temperature, and voltage trends.'],
    ['Analysis History', 'Audit trail of battery analyses with timestamps and results.'],
  ]
  return <Layout><div className="space-y-8 max-w-3xl">
    <div><h1 className="text-3xl font-semibold text-text-primary mb-1">Battery Insight</h1><p className="text-text-secondary">Battery Telemetry Analytics Platform</p></div>
    <div className="bg-bg-card border border-border-color rounded p-8 space-y-6">
      <section><h2 className="text-lg font-semibold text-text-primary mb-3">Overview</h2><p className="text-text-secondary leading-relaxed">Battery Insight is a professional battery telemetry analytics platform designed for engineers and analysts working with electric vehicle and energy storage systems. The platform provides insights into battery health, performance, and operational characteristics.</p></section>
      <section><h2 className="text-lg font-semibold text-text-primary mb-3">Key Features</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{features.map(([title, text]) => <div key={title} className="bg-bg-elevated border border-border-color rounded p-4"><h3 className="text-text-primary font-medium mb-2">{title}</h3><p className="text-text-secondary text-sm">{text}</p></div>)}</div></section>
      <section><h2 className="text-lg font-semibold text-text-primary mb-3">Analysis Modes</h2><div className="space-y-3"><div><h3 className="text-text-primary font-medium mb-1">Manual Telemetry</h3><p className="text-text-secondary text-sm">Enter telemetry data directly for analysis.</p></div><div><h3 className="text-text-primary font-medium mb-1">Existing Battery</h3><p className="text-text-secondary text-sm">Analyze batteries using their unique identifier.</p></div><div><h3 className="text-text-primary font-medium mb-1">Bulk CSV Upload</h3><p className="text-text-secondary text-sm">Ingest multiple telemetry records from a standardized CSV format.</p></div></div></section>
      <section><h2 className="text-lg font-semibold text-text-primary mb-3">Scoring Methodology</h2><p className="text-text-secondary leading-relaxed mb-3">Battery Insight uses a prototype rule-based scoring system. This is NOT a universal industry standard and is designed specifically for this platform.</p><p className="text-text-secondary text-sm bg-bg-elevated border border-border-color rounded p-4">The health score and risk classification are produced by the backend analysis engine. Results are analytical tools and should be validated against domain expertise and operational requirements.</p></section>
      <section><h2 className="text-lg font-semibold text-text-primary mb-3">Architecture</h2><p className="text-text-secondary leading-relaxed">The frontend provides a responsive interface for data analysis and visualization while the backend REST API handles processing, analysis, and persistence.</p></section>
    </div>
  </div></Layout>
}
