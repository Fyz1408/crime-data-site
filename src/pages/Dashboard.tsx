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
import DataTable, {TableColumn} from "react-data-table-component";

interface DataRow {
  title: string;
  year: string;
}

function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast()

  const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let result = await fetch(
      'http://localhost:5001/register', {
        method: "post",
        body: JSON.stringify({name, email}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    result = await result.json();
    console.warn(result);
    if (result) {
      fetchData();
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
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
  ];
  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]
  const fetchData = async () => {
    const data = await fetch('http://localhost:5001/users');
    data.json().then(r => setUsers(r))
  }
  useEffect(() => {
    fetchData().catch(console.error);
  }, [])

  return (
    <>
      <Flex h='100vh'>
        <Center w='100%' flexDir='column' mt={5}>
          <SimpleGrid columns={2} spacing={10}>
            <Card size='md'>
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
            <Card>
              <CardHeader>
                <Heading size='md'> User table</Heading>
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

            <Card>
              <CardHeader>
                <Heading size='md'> Another table </Heading>
              </CardHeader>
              <CardBody>
                <DataTable columns={columns} data={data}/>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Center>
      </Flex>
    </>
  );
}

export default Dashboard;
