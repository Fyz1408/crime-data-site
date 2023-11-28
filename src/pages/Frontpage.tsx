import React from "react";
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
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import news from "../images/news.jpg";
import mugshot from "../images/mugshot.jpg";
import './styling/FrontpageStyles.scss';
import ApexChart from "../components/graphs/ApexChart";

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
              border='solid #fbf2f3'
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
            <ApexChart/>
            <Text color={useColorModeValue('blackAlpha.600', 'gray.400')} fontSize='medium'>
              We've added some new diagrams to the dashboard check them out here!
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Login here</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Heading size='xl'> Latest arrest </Heading>
            <Divider/>
            <Text color={useColorModeValue('blue.500', 'blue.300')} fontSize='medium'>
              {getTodaysDate()}
            </Text>
          </CardHeader>
          <CardBody>
            <Image
              border='solid #fbf2f3'
              src={mugshot}
              alt='Recent mugshots of arrest in the past month'
              borderRadius='lg'
            />
            <Text color={useColorModeValue('blackAlpha.600', 'gray.400')} fontSize='medium'>
              Samuel Parker (age 46), Caleb Williams (age 31), Jackson Mitchell (age 21) and Sophia Evans (age 31) was
              arrested in the past week.
            </Text>
          </CardBody>
          <CardFooter>
            <Button> See more arrest here</Button>
          </CardFooter>
        </Card>

      </SimpleGrid>

      <Divider mt={10}/>

      <Flex h='70vh' alignItems='center' placeContent='center'>
        <Box bg='blackAlpha.300' h='90%' w='90%' m={15}>
        </Box>
      </Flex>

      <Divider mt={10}/>

      <Flex h='70vh'>
        <Center w='100%'>
          <Card h='auto' minW='320px' maxW='1000px' w='100%' p={2} mr={6} ml={6}>
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
                  colorScheme='yellow'
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