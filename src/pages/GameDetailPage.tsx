import { Heading, Spinner, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useGame from '../hooks/useGame'

const GameDetailPage = () => {
  const { slug } = useParams()
  const { data: game, isPending, isSuccess, error } = useGame(slug!)

  if (isPending) return <Spinner />

  if (error || !isSuccess) throw error

  return (
    <>
      <Heading>{game.name}</Heading>
      <Text>{game.description_raw}</Text>
    </>
  )
}

export default GameDetailPage
