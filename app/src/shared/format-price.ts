export function formatPrice(cents?: number, round = true) {
  if (!cents) {
    return 'N/A'
  }

  const crowns = round ? cents / 100 : Math.round(cents / 100)

  const formatted = crowns
    .toLocaleString('cs-CZ', {
      minimumFractionDigits: round ? 0 : 2,
      maximumFractionDigits: round ? 0 : 2,
    })
    .replace(/\s/g, '\u00A0')

  return formatted
}
