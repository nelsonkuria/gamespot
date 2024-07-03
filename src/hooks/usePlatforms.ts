import { useQuery } from '@tanstack/react-query'
import { FetchResponse } from './useData'

export interface Platform {
  id: number
  name: string
  slug: string
}

async function getPlatforms() {
  const response = await fetch(
    'https://api.rawg.io/api/platforms/lists/parents?' +
      new URLSearchParams({ key: 'fde7be0582c74645b254ba5c0c2587a4' }),
  )

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error('404 Not found. Please check your url.')
      default:
        throw new Error(`Request failed with status ${response.status}`)
    }
  }

  return response.json()
}

const usePlatforms = () => {
  return useQuery<FetchResponse<Platform>, Error>({
    queryKey: ['platforms'],
    queryFn: getPlatforms,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours,
  })
}

export default usePlatforms
