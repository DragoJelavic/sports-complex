export function getDayOfWeek(startDate: Date): string {
  return new Date(startDate).toLocaleString('en', { weekday: 'long' })
}
