export function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  let seconds: number | string = time % 60
  if (seconds < 10) seconds = `0${seconds}`
  if (minutes < 10) return `0${minutes}:${seconds}`
  return `${minutes}:${seconds}`
}
