import { useQuery } from '@tanstack/react-query'
import { GameQuery } from '../App'
import { FetchResponse } from './useData'
import { Platform } from './usePlatforms'
import { fetchAsync, formatQuery } from '../services/async'
export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
}

const useGames = (gameQuery: GameQuery) => {
  const query = Object.keys(gameQuery).length ? gameQuery : null

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: query ? ['games', { ...formatQuery(gameQuery) }] : ['games'],
    queryFn: () => fetchAsync('/games', query),
    staleTime: 60 * 1000,
  })
}

export default useGames
