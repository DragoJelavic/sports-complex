export function getDayOfWeek(startDate: Date): string {
  return new Date(startDate).toLocaleString('en', { weekday: 'long' })
}

export const formatTime = (time: Date): string => {
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
