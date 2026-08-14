export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-8 h-8 border-4 border-border-color border-t-text-primary rounded-full animate-spin"></div>
      <p className="text-text-secondary">{message}</p>
    </div>
  )
}
