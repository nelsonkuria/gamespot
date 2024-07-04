import { useQuery } from '@tanstack/react-query'
import { GameQuery } from '../App'
import { FetchResponse } from './useData'
import { Platform } from './usePlatforms'
export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
}

// const useGames = (gameQuery: GameQuery) =>
//   useData<Game>(
//     '/games',
//     JSON.stringify({
//       genres: gameQuery.genre?.id,
//       parent_platforms: gameQuery.platform?.id,
//       ordering: gameQuery.sortOrder,
//       search: gameQuery.searchText,
//     }),
//   )

function formatQuery(query: GameQuery) {
  const params: { [key: string]: string } = {
    genres: query.genre?.id ? `${query.genre?.id}` : '',
    parent_platforms: query.platform?.id ? `${query.platform?.id}` : '',
    ordering: query.sortOrder,
    search: query.searchText,
  }

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => Boolean(value)),
  )
}

async function fetchGames(query: GameQuery | null) {
  const response = await fetch(
    'https://api.rawg.io/api/games?' +
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

const useGames = (gameQuery: GameQuery) => {
  const query = Object.keys(gameQuery).length ? gameQuery : null

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: query ? ['games', { ...formatQuery(gameQuery) }] : ['games'],
    queryFn: () => fetchGames(query),
    staleTime: 60 * 1000,
  })
}

export default useGames
