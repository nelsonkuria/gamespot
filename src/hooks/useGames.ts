import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync, formatQuery } from '../services/async'
import useGameQueryStore from '../store'
import { FetchResponse } from './useData'
import { Platform } from './usePlatforms'
export interface Game {
  id: number
  name: string
  slug: string
  description_raw: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
}

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery)
  const query = Object.keys(gameQuery).length ? gameQuery : null

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: query ? ['games', { ...formatQuery(gameQuery) }] : ['games'],
    queryFn: () => fetchAsync('/games', query),
    staleTime: ms('24h'),
  })
}

export default useGames
