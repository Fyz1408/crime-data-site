import React from "react";
import {Flex, Heading, useColorModeValue} from "@chakra-ui/react";
import './FooterStyle.css';


export function Footer() {

  return (
    <>
      <Flex className='crimeTape'/>
      <Flex
        height='10vh'
        alignItems='center'
        justifyContent='center'
        flexDir='column'
      >
        <Heading size='md' color={useColorModeValue('blackAlpha.600', 'gray.300')}>
          Made by Daniel
        </Heading>

      </Flex>
    </>
  )
}