import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import {CloseIcon, HamburgerIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import React from "react";
import './NavbarStyle.css';

interface Props {
  children: React.ReactNode,
  href: string,
  isActive: boolean,
}

const Links = ['Home', 'Dashboard', 'Map', 'Administration']

const NavLink = (props: Props) => {
  const {children, href, isActive} = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      className={isActive ? 'bold' : ''}
      border={isActive ? 'solid #ebc34d' : 'solid #E2E8F0'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('solid gray.200', 'gray.700'),
      }}
      href={'/' + href}>
      {children}
    </Box>
  )
}

export default function Navbar() {
  const {colorMode, toggleColorMode} = useColorMode()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const path = window.location.pathname;

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        pos='fixed'
        w='100%'
        zIndex={200}
      >
        <Flex
          px={4}
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
            aria-label={'Open Menu'}
            display={{md: 'none'}}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Flex flexDir='row' >
              <Heading size='md'>
                Crime Analysis
              </Heading>
            </Flex>
          </HStack>
          <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
            {Links.map((link) => (
              <NavLink
                key={link}
                href={link.toLowerCase()}
                isActive={'/' + link.toLowerCase() === path}
              >
                {link}
              </NavLink>
            ))}
          </HStack>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
            onClick={toggleColorMode}
            aria-label='Toggle dark or light mode'
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link}
                  href={link.toLowerCase()}
                  isActive={'/' + link.toLowerCase() === path}
                >
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        <Flex className='crimeTape'></Flex>
      </Box>
    </>
  )
}