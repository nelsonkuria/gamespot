import { Box, Heading, Text } from '@chakra-ui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <>
      <Navbar />
      <Box padding={5}>
        <Heading as="h1">Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? 'The page you tried to access does not exist'
            : 'An unexpected error occurred'}
        </Text>
      </Box>
    </>
  )
}

export default ErrorPage
