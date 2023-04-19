import { Link } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
// import { Logo } from 'client/src/components/header/Logo.jpg'

const links = 
[
  { label: 'Homepage', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About us', path: '/about_us' },
  { label: 'Contact', path: '/contact' },
  { label: 'Checkout', path: '/checkout' },
]

export default function App (){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true })
    
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">

                <ButtonGroup variant="link" spacing="8">
                  {links.map((link) => (
                    <Link key = {link.path} to = {link.path}>
                      <Button key={link.label}>{link.label}</Button>
                    </Link>
                  ))}
                </ButtonGroup>
                
                <HStack spacing="3">
                  <Link to = "/sign_in">
                    <Button variant="ghost">Sign in</Button>
                  </Link>
                </HStack>
                
              </Flex>
            ) : (
            <Menu>
              <MenuButton>
                <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                  ml="auto"
                  onClick={onOpen}
                />
              </MenuButton>
                {isOpen ?(
                  <MenuList onClose={onClose} isOpen={isOpen}>
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <MenuItem>Item 3</MenuItem>
                  </MenuList>
                ):null}
            </Menu>    
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}