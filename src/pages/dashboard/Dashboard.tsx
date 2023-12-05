import React, {useEffect, useState} from "react";
import {Center, Divider, Flex, Heading, Text} from "@chakra-ui/react";
import './DashboardStyles.scss'
import CrimeTable from "./CrimeTable";
import Charts from "./charts/Charts";
import {API_URL} from "../../config/constants";


function Dashboard() {
  const fetchCrime = async () => {
    await fetch(API_URL + '/crime/count').then(response => {
      response.json().then(json => {
        const counters = document.querySelectorAll('.count');
        counters.forEach((counter) => {
          const updateCount = () => {
            const count = parseInt(counter.innerHTML);

            if (count < json) {
              counter.innerHTML = String(count + Math.trunc(json / 500));
              setTimeout(updateCount, 1);
            } else {
              counter.innerHTML = json;
            }
          };

          updateCount();
        });
      })
    })
  }

  useEffect(() => {
    fetchCrime().catch(console.error);
  }, [])

  return (
    <>
      <Flex h='10vh'></Flex>
      <Flex flexDir='column' minW='600px'>
        <Flex flexDir='column' alignSelf='center' alignItems='center'>
          <Heading size='xl'>
            Dashboard
          </Heading>
          <Heading size='sm' color='gray.400' display='flex'>
            Analytics of: <Text color='blue.400' ml={1} mr={1} className="count"> 0 </Text>crimes in Los Angeles
          </Heading>
        </Flex>

        <Divider mt={3}/>

        <Charts/>
      </Flex>

      <Divider/>

      <Flex flexDir='column' mt={10} mb={10} h='100%' minW='600px'>
        <Center>
          <CrimeTable/>
        </Center>
      </Flex>
    </>
  );
}

export default Dashboard;
