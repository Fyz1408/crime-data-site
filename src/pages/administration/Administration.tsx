import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr
} from "@chakra-ui/react";
import '../dashboard/DashboardStyles.scss'
import UserForm from "./UserForm";
import {Message} from "../../types/ApiTypes";
import {API_URL} from "../../config/constants";


function Administration() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const data = await fetch(API_URL + '/messages');
    data.json().then(r => setMessages(r))
  }

  useEffect(() => {
    fetchMessages().catch(console.error);
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

      <Flex justifyContent='center'>
        <Card mt={10} mr={25} ml={25} mb={5} w='100%'>
          <CardHeader>
            <Flex flexDir='row'>
              <Heading w='100%'>
                Latest messages
              </Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption> Messages </TableCaption>
                <Thead>
                  <Tr>
                    <Th> Date </Th>
                    <Th> Name </Th>
                    <Th> Email </Th>
                    <Th> Message </Th>
                  </Tr>
                </Thead>
                {messages && messages.length > 0 ? (
                  <Tbody>
                    {messages.map((message, index) => (
                      <Tooltip
                        label={`Full message: ${message.message}`}
                      >
                        <Tr key={index}>
                          <Td>{new Date(message.date).toLocaleString('en-GB', {timeZone: 'UTC'})}</Td>
                          <Td> {message.name} </Td>
                          <Td> {message.email} </Td>
                          <Td maxW='500px' overflowX='hidden' textOverflow='ellipsis'>
                            {message.message}
                          </Td>
                        </Tr>
                      </Tooltip>
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
      </Flex>

      <UserForm/>
    </>
  );
}

export default Administration;
