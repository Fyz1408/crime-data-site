import React, {useState} from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text, useColorModeValue
} from "@chakra-ui/react";
import news from "../images/news.jpg";
import './styling/FrontpageStyles.scss';

function Frontpage() {
  function getTodaysDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return (
    <>
      <Flex h='100vh' borderBottom='solid' borderColor='#ebc34d'>
        <Center w='100%' flexDir='column'>
          <Heading size='4xl' color='white'> Crime Analysis</Heading>
          <Heading size='md' color='white'> Welcome to the official USA Crime Analysis website</Heading>
          <Button
            className='crimeBtn'
            backgroundColor='#ebc34d'
            textColor='black'
            variant='solid'
            mt={5}
            as={'a'}
            href={'/dashboard'}
          >
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
      <SimpleGrid minChildWidth='320px' spacing='40px' mt={10} mr={7} ml={7}>
        <Card>
          <CardHeader>
            <Heading size='xl'> Latest News </Heading>
            <Divider/>
            <Text color={useColorModeValue('blue.500', 'blue.300')} fontSize='medium'>
              {getTodaysDate()}
            </Text>
          </CardHeader>
          <CardBody>
            <Image
              border='solid lightgray'
              src={news}
              alt='Organized crime kingpin Gregory Woolley gunned down near Montreal'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'> Kingpin Gregory Woolley gunned down near Montreal</Heading>
              <Text color={useColorModeValue('blackAlpha.600', 'gray.400')} fontSize='medium'>
                Quebec organized crime kingpin Gregory Woolley was gunned down Friday near Montreal, multiple sources
                confirmed to CTV News.
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button>Read more here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='xl'> Dashboard </Heading>
            <Divider/>
            <Text color={useColorModeValue('blue.500', 'blue.300')} fontSize='medium'>
              {getTodaysDate()}
            </Text>
          </CardHeader>
          <CardBody>
            <Text> We've added some new diagrams to the dashboard check them out here!</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='xl'> Diagrams </Heading>
            <Divider/>
            <Text color={useColorModeValue('blue.500', 'blue.300')} fontSize='medium'>
              {getTodaysDate()}
            </Text>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <Flex h='100vh'>
        <Center w='100%'>
          <Card w='50%' h='auto' p={2}>
            <FormControl>
              <CardHeader>
                <Heading size='lg'> Contact us </Heading>
              </CardHeader>
              <CardBody>
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder='Enter name'/>

                <FormLabel mt={3}>Email address</FormLabel>
                <Input type='email' placeholder='Enter email'/>

                <FormLabel mt={3}> Message </FormLabel>
                <Input type='text' minH='15vh' placeholder='Enter your message here'/>
              </CardBody>
              <CardFooter>
                <Button
                  mt={4}
                  colorScheme='teal'
                  type='submit'
                >
                  Submit
                </Button>
              </CardFooter>
            </FormControl>
          </Card>
        </Center>
      </Flex>
    </>
  );
}

export default Frontpage;