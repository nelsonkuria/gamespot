import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync, formatQuery } from '../services/async'
import useGameQueryStore from '../store'
import type { Game } from '../types/Game'
import type { FetchResponse } from './useData'

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
