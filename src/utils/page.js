import { pageSizes } from "../helpers/page-size"

export const calculeSizePage = (typePage) => {
    const page = pageSizes[typePage]
    const width = page[0] * 96 / 72 
    const height = page[1] * 96 / 72 
    return [width,height]
}