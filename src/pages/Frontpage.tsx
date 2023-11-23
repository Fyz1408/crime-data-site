import React from "react";
import {Box, Button, Center, Divider, Flex, Heading} from "@chakra-ui/react";
import './styling/FrontpageStyles.scss'

function Frontpage() {

  return (
    <>
      <Flex h='100vh' borderBottom='solid' borderColor='#ebc34d'>
        <Center w='100%' flexDir='column'>
          <Heading size='4xl' color='white'> Crime Analysis</Heading>
          <Heading size='md' color='white'> Welcome to the official USA Crime Analysis website</Heading>
          <Button backgroundColor='#ebc34d' textColor='black' variant='solid' mt={5} className='crimeBtn'>
            Go to dashboard
          </Button>
        </Center>
        <Box
          className='bgImage'
          w='100%'
          h='inherit'
          bgImage="url('../images/street.jpg')"
          bgPos='bottom'
          position='absolute'
          zIndex={-10}
        />
      </Flex>
      <Divider/>
      <Flex h='100vh'>

      </Flex>
    </>
  );
}

export default Frontpage;