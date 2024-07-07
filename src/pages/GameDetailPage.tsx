import { GridItem, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ExpandableText from '../components/ExpandableText'
import useGame from '../hooks/useGame'

import GameAttributes from '../components/GameAttributes'
import GameScreenshots from '../components/GameScreenshots'
import GameTrailer from '../components/GameTrailer'

const GameDetailPage = () => {
  const { slug } = useParams()
  const { data: game, isPending, isSuccess, error } = useGame(slug!)

  if (isPending) return <Spinner />

  if (error || !isSuccess) throw error

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading>{game.name}</Heading>
        <ExpandableText>{game.description_raw}</ExpandableText>
        <GameAttributes game={game} />
      </GridItem>
      <GridItem>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  )
}

export default GameDetailPage
