export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined) return ''
  return parseFloat(value).toFixed(decimals)
}

export const truncateId = (id, length = 8) => {
  if (!id) return ''
  return id.length > length ? id.substring(0, length) + '...' : id
}
