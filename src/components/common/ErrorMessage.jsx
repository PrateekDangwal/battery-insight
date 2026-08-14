export default function ErrorMessage({ title = 'Error', message = 'An error occurred' }) {
  return (
    <div className="bg-red-950 border border-red-900 rounded p-4">
      <h3 className="font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{message}</p>
    </div>
  )
}
