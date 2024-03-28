import { useEffect, useState } from 'react'

export interface Platform {
  id: number
  name: string
  slug: string
}
export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
}

interface FetchGamesResponse {
  count: number
  results: Game[]
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(
      'https://api.rawg.io/api/games?' +
        new URLSearchParams({ key: 'fde7be0582c74645b254ba5c0c2587a4' }),
      { signal: controller.signal },
    )
      .then((res) => {
        if (res.ok) return res.json()

        switch (res.status) {
          case 404:
            throw new Error('Not found! Check your url.')
          default:
            throw new Error('Something bad happened!')
        }
      })
      .then((data: FetchGamesResponse) => setGames(data.results))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })

    return () => controller.abort()
  }, [])

  return { games, error }
}

export default useGames
