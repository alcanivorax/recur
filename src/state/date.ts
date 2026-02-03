export function daysBetween(a: string, b: string): number {
  const d1 = new Date(a)
  const d2 = new Date(b)

  d1.setHours(0, 0, 0, 0)
  d2.setHours(0, 0, 0, 0)

  const diff = d2.getTime() - d1.getTime()

  return Math.floor(diff / (1000 * 60 * 60 * 24))
}
