export const formatBytesToMB = (bytes: number, decimals = 2): string => {
    if(bytes === 0) return "0 MB"
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(decimals)} MB`
}