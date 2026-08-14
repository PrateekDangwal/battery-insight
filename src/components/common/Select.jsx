export default function Select({
  label,
  error,
  options = [],
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
      <select
        className={`
          px-3 py-2 bg-bg-card border border-border-color rounded
          text-text-primary
          focus:outline-none focus:border-text-secondary focus:ring-1 focus:ring-text-secondary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-700 focus:border-red-700 focus:ring-red-700' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
