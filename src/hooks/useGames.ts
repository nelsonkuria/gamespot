import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { GameQuery } from '../App'
import { fetchAsync, formatQuery } from '../services/async'
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

const useGames = (gameQuery: GameQuery) => {
  const query = Object.keys(gameQuery).length ? gameQuery : null

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: query ? ['games', { ...formatQuery(gameQuery) }] : ['games'],
    queryFn: () => fetchAsync('/games', query),
    staleTime: ms('24h'),
  })
}

export default useGames
