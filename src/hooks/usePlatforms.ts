import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { fetchAsync } from '../services/async'
import { FetchResponse } from './useData'
import Platform from '../types/Platform'

const usePlatforms = () => {
  return useQuery<FetchResponse<Platform>, Error>({
    queryKey: ['platforms'],
    queryFn: () => fetchAsync('/platforms/lists/parents'),
    staleTime: ms('24h'),
  })
}

export default usePlatforms
