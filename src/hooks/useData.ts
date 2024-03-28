import { useEffect, useState } from 'react'

interface FetchResponse<T> {
  count: number
  results: T[]
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    setIsLoading(true)
    fetch(
      `https://api.rawg.io/api${endpoint}?` +
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
      .then((data: FetchResponse<T>) => setData(data.results))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [endpoint])

  return { data, error, isLoading }
}

export default useData
