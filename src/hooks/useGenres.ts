import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import { FetchResponse } from './useData'
import genres from '../data/genres'
import { fetchAsync } from '../services/async'
export interface Genre {
  id: number
  name: string
  image_background: string
}

const useGenres = () => {
  return useQuery<FetchResponse<Genre>, Error>({
    queryKey: ['genres'],
    queryFn: () => fetchAsync('/genres'),
    staleTime: ms('24h'),
    initialData: { count: genres.length, results: genres },
  })
}

export default useGenres
