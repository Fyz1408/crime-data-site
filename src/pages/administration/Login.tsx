import React, {useEffect, useState} from 'react';
import Administration from "./Administration";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text, useToast
} from "@chakra-ui/react";
import {API_URL} from "../../config/constants";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const toast = useToast()

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL + '/users/login', {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response) {
        const result = await response.json();

        if (result.success) {
          localStorage.setItem('loggedIn', 'true');
          setLoggedIn(true);
          toast({
            title: 'Login successful',
            position: 'bottom',
            status: 'success',
            duration: 3500,
            isClosable: true,
          })
          setEmail("")
          setPassword("")
        } else {
          localStorage.setItem('loggedIn', 'false');
          toast({
            title: 'Invalid credentials',
            description: "Please check your credentials and try again",
            position: 'bottom',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }

    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Invalid credentials',
        description: "Please check your credentials and try again",
        position: 'bottom',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', "false");
  }

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === "true") {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [localStorage.getItem('loggedIn')]);


  return (
    <>
      <Flex h='10vh'></Flex>
      {loggedIn ? (
        <>
          <Administration/>
          <Center mb={5}>
            <Button colorScheme='red' onClick={() => logOut()}> Log out </Button>
          </Center>
        </>
      ) : (
        <Flex mb={100} h='70vh' justifyContent='center'>
          <Center>
            <Card variant='elevated' w={350}>
              <CardHeader>
                <Heading size='md'> Login</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Email
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Password
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Submit
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      <Button onClick={handleLogin} colorScheme='green'>Login</Button>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Center>
        </Flex>
      )}
    </>
  );
};

export default Login;
