import { useQuery } from '@tanstack/react-query'
import { FetchResponse } from './useData'
import { fetchAsync } from '../services/async'

export interface Platform {
  id: number
  name: string
  slug: string
}

const usePlatforms = () => {
  return useQuery<FetchResponse<Platform>, Error>({
    queryKey: ['platforms'],
    queryFn: () => fetchAsync('/platforms/lists/parents'),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours,
  })
}

export default usePlatforms
