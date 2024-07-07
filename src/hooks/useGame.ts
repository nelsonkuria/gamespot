import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync } from '../services/async'
import type { Game } from '../types/Game'

const useGame = (slug: string) => {
  return useQuery<Game, Error>({
    queryKey: ['games', slug],
    queryFn: () => fetchAsync(`/games/${slug}`),
    staleTime: ms('24h'),
  })
}

export default useGame
