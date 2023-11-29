import React, {useEffect, useState} from "react";
import {Box, Center, Divider, Flex, Heading, Progress, SimpleGrid, Text} from "@chakra-ui/react";
import './DashboardStyles.scss'
import {CrimeWeapon} from "../../types/CrimeTypes";
import DonutChart from "../../components/graphs/DonutChart";
import {API_URL} from "../../config/constants";
import ExampleDonut from "../../components/graphs/ExampleDonut";
import ExampleChart from "../../components/graphs/ExampleChart";
import {DonutData, PieData} from "../../types/ChartTypes";
import PieChart from "../../components/graphs/PieChart";
import CrimeTable from "./CrimeTable";


function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [crimeCount, setCrimeCount] = useState<number>(0);
  const [crimeVictims, setCrimeVictims] = useState<DonutData[]>([]);
  const [crimeWeapons, setCrimeWeapons] = useState<PieData[]>([]);

  const fetchCrime = async () => {
    await fetch(API_URL + '/crime/count').then(response => {
      response.json().then(json => setCrimeCount(json))
    })
  }

  const fetchCrimeWeapons = async () => {
    const data = await fetch(API_URL + '/crime/weapons');

    data.json().then(response => {
      if (response && response.length > 0) {
        const sanitizedResponse = response
          .filter((item: CrimeWeapon) => item.count >= 2000)
          .map((item: CrimeWeapon) => ({
            ...item,
            label: item._id !== null ? FormatString(item._id) : 'No weapon',
          }));

        setCrimeWeapons(sanitizedResponse);
      }
    })
  }
  const fetchCrimeVictims = async () => {
    const data = await fetch(API_URL + '/crime/genders');

    data.json().then(res => {
      if (res && res.length > 0) {
        const donutDataArray: DonutData[] = Object.keys(res[0]).map(label => ({
          label: FormatString(label),
          count: res[0][label] || 0
        }));

        setCrimeVictims(donutDataArray);
      }
    })
  }

  function FormatString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    Promise.all([
      fetchCrimeVictims(),
      fetchCrime(),
      fetchCrimeWeapons()
    ])
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [])

  return (
    <>
      <Flex h='10vh'></Flex>
      {isLoading ? (
        <>
          <Flex h='80vh' w='100%' alignItems='center' justifyContent='center' flexDir='column'>
            <Box p={25}>
              <Heading size='xl'> Loading Dashboard.. </Heading>
              <Progress size='lg' isIndeterminate colorScheme='teal' borderRadius='15px'/>
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Flex flexDir='column'>
            <Flex flexDir='column' alignSelf='center' alignItems='center'>
              <Heading size='xl'>
                Dashboard
              </Heading>
              <Heading size='sm' color='gray.400' display='flex'>
                Analytics of: <Text color='blue.400' ml={1} mr={1}> {crimeCount} </Text>crimes in Los Angeles
              </Heading>
            </Flex>

            <Divider mt={3}/>

            <SimpleGrid minChildWidth='600px' spacing='40px' mt={10} mr={7} ml={7} columns={2}>
              <Box>
                <Heading size='md' display='flex'>
                  Gender of the victims
                </Heading>
                <Heading size='xs' color='gray.400' display='flex'>
                  Other can be animals, privacy reasons, etc..
                </Heading>
                <DonutChart data={crimeVictims}/>
              </Box>

              <Box>
                <Heading size='md' display='flex'>
                  Most popular weapons used
                </Heading>
                <Heading size='xs' color='gray.400' display='flex'>
                  Only weapons with a count higher than 2000 is shown
                </Heading>
                <PieChart data={crimeWeapons}/>
              </Box>

              <Box>
                <Heading size='md' display='flex'>
                  Crimes in each month
                </Heading>
                <ExampleChart/>
              </Box>

              <Box>
                <Heading size='md' display='flex'>
                  Crimes sorted by streets
                </Heading>
                <ExampleChart/>
              </Box>
              <Box>
                <Heading size='md' display='flex'>
                  Crime descriptions
                </Heading>
                <ExampleDonut/>
              </Box>

            </SimpleGrid>
          </Flex>

          <Divider/>

          <Flex flexDir='column' mt={10} mb={10} h='100%'>
            <Center>
              <CrimeTable/>
            </Center>
          </Flex>
        </>
      )}
    </>
  );
}

export default Dashboard;
