export const isPathActive = (pathname: string, base: string) => {
    return pathname === base
}

export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatterDate = (parametro: string) => {
    const date = new Date(parametro)
    const resp = date.toLocaleString("es-PE", {
        dateStyle: "medium"
    })
    return resp
}