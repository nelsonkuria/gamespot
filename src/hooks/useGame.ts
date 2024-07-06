import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync } from '../services/async'
import { Game } from './useGames'

const useGame = (slug: string) => {
  return useQuery<Game, Error>({
    queryKey: ['games', slug],
    queryFn: () => fetchAsync(`/games/${slug}`),
    staleTime: ms('24h'),
  })
}

export default useGame
