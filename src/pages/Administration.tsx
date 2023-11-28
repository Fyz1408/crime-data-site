import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import './styling/DashboardStyles.scss'
import {API_URL} from "../config/constants";

interface DataRow {
  title: string;
  year: string;
}

function Administration() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast()

  const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let result = await fetch(
      API_URL + '/register', {
        method: "post",
        body: JSON.stringify({name, email}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    result = await result.json();
    console.warn(result);
    if (result) {
      fetchUsers();
      toast({
        title: 'Data saved succesfully.',
        description: "A user was created",
        position: 'bottom',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setEmail("");
      setName("");
    }
  }
  const fetchUsers = async () => {
    const data = await fetch(API_URL + '/users');
    data.json().then(r => setUsers(r))
  }
  useEffect(() => {
    fetchUsers().catch(console.error);
  }, [])

  return (
    <>
      <Flex h='10vh'></Flex>
      <Flex flexDir='column'>
        <Center>
          <Heading size='xl'>
            Administration
          </Heading>
        </Center>
        <Divider mt={3}/>
      </Flex>


      <SimpleGrid spacing='40px' mr={7} ml={7} mt={10} mb={10} minChildWidth='320px'>
        <Card mr={6} ml={6}>
          <form action="">
            <CardHeader>
              <Heading as='h2'>
                Create a user
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider/>} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Enter name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    <Input
                      type='text'
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Enter email
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    <Input
                      type='email'
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Text>
                </Box>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button type="submit" onClick={handleOnSubmit} colorScheme='green'>
                  Submit
                </Button>
              </ButtonGroup>
            </CardFooter>
          </form>
        </Card>
        <Card mr={6} ml={6}>
          <CardHeader>
            <Heading as='h2'>
              User table
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped'>
                <TableCaption> Users </TableCaption>
                <Thead>
                  <Tr>
                    <Th> ID </Th>
                    <Th> Name </Th>
                    <Th> Mail</Th>
                  </Tr>
                </Thead>
                {users && users.length > 0 ? (
                  <Tbody>
                    {users.map((user, index) => (
                      <Tr key={index}>
                        <Td> {user._id} </Td>
                        <Td> {user.name} </Td>
                        <Td> {user.email} </Td>
                      </Tr>
                    ))}
                  </Tbody>
                ) : (
                  <Tbody>
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </SimpleGrid>

    </>
  );
}

export default Administration;
