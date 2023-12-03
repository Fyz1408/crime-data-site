import React, {useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, FormLabel, Heading, Input, useToast} from "@chakra-ui/react";
import './FrontpageStyles.scss';
import {API_URL} from "../../config/constants";

interface message {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast()

  const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let result = await fetch(
      API_URL + '/messages/send', {
        method: "post",
        body: JSON.stringify({name, email, message}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    result = await result.json();
    if (result) {
      toast({
        title: 'We have received your message!',
        description: "You will hear from us soon",
        position: 'bottom',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setEmail("");
      setName("");
      setMessage("");
    }
  }
  return (
    <>
      <Card h='auto' minW='320px' maxW='1000px' w='100%' p={2} mr={6} ml={6}>
        <form action="">
          <CardHeader>
            <Heading size='lg'> Contact us </Heading>
          </CardHeader>
          <CardBody>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormLabel mt={3}>Email address</FormLabel>
            <Input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormLabel mt={3}> Message </FormLabel>
            <Input
              type='text'
              minH='15vh'
              placeholder='Enter your message here'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </CardBody>
          <CardFooter>
            <Button
              mt={4}
              colorScheme='yellow'
              type='submit'
              onClick={handleOnSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default ContactForm;