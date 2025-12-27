export function formatPrice(cents?: number) {
  if (!cents) {
    return 'N/A'
  }

  const crowns = Math.round(cents / 100)
  const formatted = crowns.toLocaleString('cs-CZ').replace(/\s/g, '\u00A0')

  return formatted
}
