export default function Input({
  label,
  error,
  type = 'text',
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`
          px-3 py-2 bg-bg-card border border-border-color rounded
          text-text-primary placeholder-text-muted
          focus:outline-none focus:border-text-secondary focus:ring-1 focus:ring-text-secondary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-700 focus:border-red-700 focus:ring-red-700' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
