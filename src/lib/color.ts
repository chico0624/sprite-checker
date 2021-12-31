export const hex2rgb = (hex: string): number[] => {
    if (hex.length === 3) {
        hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3)
    }

    const hexRgb = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)]

    return hexRgb.map(h => parseInt(h, 16))
}