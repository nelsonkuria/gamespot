import { useQuery } from '@tanstack/react-query'
import { FetchResponse } from './useData'
import genres from '../data/genres'
export interface Genre {
  id: number
  name: string
  image_background: string
}

async function fetchGenres() {
  const response = await fetch(
    'https://api.rawg.io/api/genres?' +
      new URLSearchParams({
        key: 'fde7be0582c74645b254ba5c0c2587a4',
      }),
  )

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error('Not found! Check your url.')
      default:
        throw new Error(`Request failed with status code ${response.status}`)
    }
  }

  return response.json()
}

const useGenres = () => {
  return useQuery<FetchResponse<Genre>, Error>({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: { count: genres.length, results: genres },
  })
}

export default useGenres
