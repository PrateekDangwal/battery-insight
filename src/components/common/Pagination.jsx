import Button from './Button'

export default function Pagination({
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  loading = false,
}) {
  return (
    <div className="flex items-center gap-4 mt-6 justify-between">
      <div className="text-sm text-text-secondary">
        Page {currentPage + 1} of {totalPages}
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 0 || loading}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages - 1 || loading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
