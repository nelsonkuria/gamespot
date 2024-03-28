import { useEffect, useState } from 'react'

interface Genre {
  id: number
  name: string
  slug: string
}

interface FetchGenresResponse {
  count: number
  results: Genre[]
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    setIsLoading(true)
    fetch(
      'https://api.rawg.io/api/genres?' +
        new URLSearchParams({ key: 'fde7be0582c74645b254ba5c0c2587a4' }),
      { signal: controller.signal },
    )
      .then((res) => {
        if (res.ok) {
          setIsLoading(false)
          return res.json()
        }

        switch (res.status) {
          case 404:
            throw new Error('Not found! Check your url.')
          default:
            throw new Error('Something bad happened!')
        }
      })
      .then((data: FetchGenresResponse) => setGenres(data.results))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { genres, error, isLoading }
}

export default useGenres
