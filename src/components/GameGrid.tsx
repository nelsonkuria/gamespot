import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Game {
  id: number
  name: string
}

interface FetchGamesResponse {
  count: number
  results: Game[]
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(
      'https://api.rawg.io/api/gasmes?' +
        new URLSearchParams({ key: 'fde7be0582c74645b254ba5c0c2587a4' }),
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
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  )
}

export default GameGrid
