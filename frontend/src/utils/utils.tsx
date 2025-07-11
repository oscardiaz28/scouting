export const isPathActive = (pathname: string, base: string) => {
    return pathname === base
}

export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatterDate = (parametro: string) => {
  const utcDate = new Date(parametro)

  const year = utcDate.getUTCFullYear()
  const month = utcDate.getUTCMonth()
  const day = utcDate.getUTCDate()
  const localDate = new Date(year, month, day)
  return localDate.toLocaleString("es-PE", {
    dateStyle: "medium"
  })
}


export const formatterDuration = ( totalSeconds: number ) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor( (totalSeconds % 3600 ) / 60 )
  const seconds = Math.floor(totalSeconds % 60)

  const pad = (n: number) => String(n).padStart(2, '0')

  return hours > 0
  ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  : `${pad(minutes)}:${pad(seconds)}`
}

export const formatterBytes = (bytes: number, decimals = 2): string => {
    if(bytes === 0) return "0 MB"
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(decimals)} MB`
}