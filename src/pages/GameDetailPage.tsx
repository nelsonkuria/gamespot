import { Heading, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useGame from '../hooks/useGame'
import ExpandableText from '../components/ExpandableText'

const GameDetailPage = () => {
  const { slug } = useParams()
  const { data: game, isPending, isSuccess, error } = useGame(slug!)

  if (isPending) return <Spinner />

  if (error || !isSuccess) throw error

  return (
    <>
      <Heading>{game.name}</Heading>
      <ExpandableText>{game.description_raw}</ExpandableText>
    </>
  )
}

export default GameDetailPage
