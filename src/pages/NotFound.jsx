import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'

export default function NotFound() {
  return <Layout><div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
    <div className="text-center space-y-6"><div className="text-7xl font-bold text-text-primary">404</div><div><h1 className="text-3xl font-semibold text-text-primary mb-2">Page Not Found</h1><p className="text-text-secondary">The page you are looking for does not exist.</p></div></div>
    <Link to="/"><Button size="lg">Back to Dashboard</Button></Link>
  </div></Layout>
}
