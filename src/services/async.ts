import { GameQuery } from '../App'

export function formatQuery(query: GameQuery) {
  const params: { [key: string]: string } = {
    genres: query.genreId ? `${query.genreId}` : '',
    parent_platforms: query.platformId ? `${query.platformId}` : '',
    ordering: query.sortOrder,
    search: query.searchText,
  }

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => Boolean(value)),
  )
}

export async function fetchAsync(endpoint: string, query?: GameQuery | null) {
  const response = await fetch(
    `https://api.rawg.io/api${endpoint}?` +
      new URLSearchParams({
        key: 'fde7be0582c74645b254ba5c0c2587a4',
        ...(query ? formatQuery(query) : {}),
      }),
  )

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error('404 not found. Please check your url.')
      default:
        throw new Error(`Request failed with a status of ${response.status}`)
    }
  }

  return response.json()
}
