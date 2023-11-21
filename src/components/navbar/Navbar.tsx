import {Box, Flex, Heading, HStack, IconButton, Image, Stack, useColorModeValue, useDisclosure} from '@chakra-ui/react'
import {CloseIcon, HamburgerIcon, InfoOutlineIcon} from '@chakra-ui/icons'
import React from "react";


interface Props {
  children: React.ReactNode,
  href: string
}

const Links = ['Home', 'Dashboard']

const NavLink = (props: Props) => {
  const {children, href} = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'/' + href}>
      {children}
    </Box>
  )
}

export default function Navbar() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} pos='fixed' w='100%' zIndex={200}
           borderBottom={'solid'} borderBottomColor={'blue.300'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
            aria-label={'Open Menu'}
            display={{md: 'none'}}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Flex flexDir='row' w='10vh'>
              <Heading size='md'> Crime </Heading>

            </Flex>
            <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <IconButton icon={<InfoOutlineIcon/>} aria-label={'outlineIcon'} />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}