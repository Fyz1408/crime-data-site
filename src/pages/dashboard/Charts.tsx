import React, {useEffect, useState} from "react";
import {Box, Flex, Heading, HStack, Progress, ScaleFade, Select, SimpleGrid} from "@chakra-ui/react";
import './DashboardStyles.scss'
import {CrimeDate, CrimeWeapon} from "../../types/CrimeTypes";
import DonutChart from "../../components/graphs/DonutChart";
import {API_URL} from "../../config/constants";
import ExampleDonut from "../../components/graphs/ExampleDonut";
import ExampleChart from "../../components/graphs/ExampleChart";
import {DonutData, HeatMapData, Month, PieData} from "../../types/ChartTypes";
import PieChart from "../../components/graphs/PieChart";
import HeatMap from "../../components/graphs/HeatMap";


function Charts() {
  const [isLoading, setIsLoading] = useState(true);
  const [crimeVictims, setCrimeVictims] = useState<DonutData[]>([]);
  const [crimeWeapons, setCrimeWeapons] = useState<PieData[]>([]);
  const [crimeDates, setCrimeDates] = useState<HeatMapData[]>([]);

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

  const fetchCrimeDates = async () => {
    const data = await fetch(API_URL + '/crime/date');

    data.json().then(res => {
        if (res && res.length > 0) {

        }
      }
    )
  }

  const fetchCrimeDatesYear = async (year: string) => {
    const data = await fetch(API_URL + `/crime/date/${year}`);

    data.json().then(res => {
        if (res && res.length > 0) {
          const heatMapData: HeatMapData[] = res.reduce((result: HeatMapData[], crimeDate: CrimeDate ) => {
            const date = new Date(crimeDate._id);
            const month = date.toLocaleString('en-US', { month: 'long' });
            const day = date.toLocaleString('en-US', { day: 'numeric' });

            // Find the month in the result array
            let monthItem = result.find((item) => item.month === month);

            // If the month doesn't exist, we create a new month object
            if (!monthItem) {
              monthItem = { month, monthData: [] };
              result.push(monthItem);
            }

            // Add day & count to the monthData array and afterward sort
            monthItem.monthData.push({ day, count: crimeDate.count });
            monthItem.monthData.sort((a: Month, b: Month) => parseInt(a.day) - parseInt(b.day));

            return result
            }, []);

          // Sort the months in correct order
          heatMapData.sort((a, b) => {
            const monthsOrder = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];

            return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
          });

          setCrimeDates(heatMapData);
        }
      }
    )
  }

  function OnSelect(value: string) {
    const selectedYear = value !== "" ? value : '2023';
    fetchCrimeDatesYear(selectedYear);
  }
  function FormatString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    Promise.all([
      fetchCrimeVictims(),
      fetchCrimeWeapons(),
      fetchCrimeDatesYear('2023')
    ])
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <Flex h='80vh' w='100%' alignItems='center' justifyContent='center' flexDir='column'>
            <Box p={25}>
              <Heading size='xl'> Loading Charts.. </Heading>
              <Progress size='lg' isIndeterminate colorScheme='teal' borderRadius='15px'/>
            </Box>
          </Flex>
        </>
      ) : (
        <ScaleFade in={!isLoading}>
          <SimpleGrid minChildWidth='600px' spacing='40px' mt={10} mr={7} ml={7} columns={2}>
            <Box>
              <Heading size='md' display='flex'>
                Gender of the victims
              </Heading>
              <Heading size='xs' color='gray.400' display='flex'>
                Other is animals, unknown, privacy reasons, etc..
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

            <Box>
              <HStack mb={1}>
                <Heading size='md' display='flex'>
                  Heatmap of crimes committed in
                </Heading>
                <Select
                  h='unset'
                  w='unset'
                  size='lg'
                  variant='flushed'
                  placeholder='2023'
                  onChange={(e) => OnSelect(e.target.value)}
                >
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                </Select>
              </HStack>

              <Heading size='xs' color='gray.400' display='flex'>
                We only have data from 1 January 2020 to 13 November 2023
              </Heading>

              <HeatMap data={crimeDates}/>
            </Box>
          </SimpleGrid>
        </ScaleFade>
      )}
    </>
  );
}

export default Charts;
