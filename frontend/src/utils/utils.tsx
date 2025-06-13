export const isPathActive = (pathname: string, base: string) => {
    return pathname === base
}

export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatterDate = (parametro: string) => {
    const date = new Date(parametro)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC'  };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
    return formattedDate
}