import React from "react";
import {Center, Divider, Flex, Text} from "@chakra-ui/react";

function Frontpage() {

  return (
    <>
      <Flex h='80vh'>
        <Center w='100%' flexDir='column' mt={5}>
          <Text fontSize='2xl'>
            <code> Front page </code>
          </Text>
        </Center>
      </Flex>
      <Divider/>
    </>
  );
}

export default Frontpage;