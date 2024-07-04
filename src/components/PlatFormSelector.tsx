import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePlatform from '../hooks/usePlatform'
import usePlatforms from '../hooks/usePlatforms'
import useGameQueryStore from '../store'

const PlatFormSelector = () => {
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId)
  const selectedPlatform = usePlatform(selectedPlatformId)

  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId)

  const { data, error } = usePlatforms()

  if (error) return <p>{error.message}</p>

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || 'Platforms'}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            key={platform.id}
            onClick={() => setSelectedPlatformId(platform.id)}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default PlatFormSelector
