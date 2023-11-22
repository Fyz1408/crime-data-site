import React from "react";
import {Flex, Heading} from "@chakra-ui/react";


export function Footer() {

  return (
    <>
      <Flex
        height='10vh'
        alignItems='center'
        justifyContent='center'
        borderTop='solid'
        borderColor='blue.300'
        flexDir='column'
        backgroundColor='white'
      >
        <Heading size='md' color='blackAlpha.600'>
          Made by Daniel
        </Heading>

      </Flex>
    </>
  )
}