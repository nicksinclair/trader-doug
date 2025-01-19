import { restClient } from '@polygon.io/client-js'

const rest = restClient(process.env.POLYGON_API_KEY)

export const stocksClient = rest.stocks
export const referenceClient = rest.reference