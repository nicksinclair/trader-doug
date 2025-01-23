import { restClient } from '@polygon.io/client-js'

const globalFetchOptions = {
  // pagination: true,
}

const rest = restClient(process.env.POLYGON_API_KEY, 'https://api.polygon.io', globalFetchOptions)

export const stocksClient = rest.stocks
export const referenceClient = rest.reference