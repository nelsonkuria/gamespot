import { useQuery } from '@tanstack/react-query'
import { fetchAsync } from '../services/async'
import type { Screenshot } from '../types/Screenshot'
import type { FetchResponse } from './useData'

const useScreenshots = (gameId: number) => {
  return useQuery<FetchResponse<Screenshot>, Error>({
    queryKey: ['screenshots', gameId],
    queryFn: () => fetchAsync(`/games/${gameId}/screenshots`),
  })
}

export default useScreenshots
