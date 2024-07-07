import useTrailers from '../hooks/useTrailers'

interface Props {
  gameId: number
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, isPending, error } = useTrailers(gameId)
  const trailer = data?.results[0]

  if (isPending) return null

  if (error) throw error

  return trailer ? (
    <video src={trailer.data[480]} poster={trailer.preview} controls></video>
  ) : null
}

export default GameTrailer
