import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync } from '../services/async'
import type Trailer from '../types/Trailer'
import { FetchResponse } from './useData'

const useTrailers = (gameId: number) =>
  useQuery<FetchResponse<Trailer>, Error>({
    queryKey: ['trailers', gameId],
    queryFn: () => fetchAsync(`/games/${gameId}/movies`),
    staleTime: ms('24'),
  })

export default useTrailers
