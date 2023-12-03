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
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import news from "../../images/news.jpg";
import mugshot from "../../images/mugshot.jpg";
import './FrontpageStyles.scss';
import ExampleColumn from "../../components/graphs/examples/ExampleColumn";
import ContactForm from "./ContactForm";

function Frontpage() {
  function getTodaysDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return (
    <>
      <Flex h='100vh' borderBottom='solid' borderColor='#ebc34d'>
        <Center w='100%' flexDir='column' textAlign='center'>
          <Heading size='4xl' color='white'> Crime Analysis</Heading>
          <Divider w='50%'/>
          <Heading size='md' color='white' mt={2}> Welcome to the official USA Crime Analysis website</Heading>
          <Button
            className='crimeBtn'
            backgroundColor='#ebc34d'
            textColor='gray.700'
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
          bgImage="url('../images/street3.jpg')"
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
            <Button
              target='_blank'
              as='a'
              href='https://montreal.ctvnews.ca/organized-crime-kingpin-gregory-woolley-gunned-down-near-montreal-1.6649685'>
              Read more here
            </Button>
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
            <ExampleColumn/>
            <Text color={useColorModeValue('blackAlpha.600', 'gray.400')} fontSize='medium'>
              We've added some new diagrams to the dashboard check them out here!
            </Text>
          </CardBody>
          <CardFooter>
            <Button
              as={'a'}
              href={'/dashboard'}
            >
              Go to dashboard
            </Button>
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

      <Flex h='80vh' mt={4} mb={4}>
        <Center w='100%'>
          <ContactForm/>
        </Center>
      </Flex>
    </>
  );
}

export default Frontpage;