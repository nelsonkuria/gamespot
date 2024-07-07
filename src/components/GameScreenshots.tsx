import { Image, SimpleGrid } from '@chakra-ui/react'
import useScreenshots from '../hooks/useScreenshots'

interface Props {
  gameId: number
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isPending, error } = useScreenshots(gameId)

  if (isPending) return null

  if (error) throw error

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
      {data?.results.map((file) => <Image key={file.id} src={file.image} />)}
    </SimpleGrid>
  )
}

export default GameScreenshots
