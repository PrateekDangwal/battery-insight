import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 bg-bg-primary">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
