import React, {useEffect, useState} from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import './styling/DashboardStyles.scss'
import {Crime} from "../types/crimeTypes";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import DonutChart from "../components/graphs/DonutChart";
import {API_URL} from "../config/constants";

interface DataRow {
  title: string;
  year: string;
}

function Dashboard() {
  const [donutArray, setDonutArray] = useState<number[]>([]);
  const [crimeCount, setCrimeCount] = useState<number>(0);
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const toast = useToast()

  const fetchCrime = async () => {
    const data = await fetch(API_URL + '/crime');
    data.json().then(r => setCrimes(r))
  }

  const fetchCrimeVictims = async () => {
    const data = await fetch(API_URL + '/crime/genders');
    data.json().then(res => {
      if (res.length > 0) {
        let arr = []
        arr.push(res[0].femaleVict[0].count)
        arr.push(res[0].maleVict[0].count)
        arr.push(res[0].other[0].count)

        setDonutArray(arr)
      }
    })
  }

  useEffect(() => {
    fetchCrime().catch(console.error);
    fetchCrimeVictims().catch(console.error);
  }, [])

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  return (
    <>
      <Flex h='10vh'></Flex>
      <Flex flexDir='column'>
        <Center>
          <Heading size='xl'>
            Dashboard
          </Heading>
        </Center>

        <Divider mt={3}/>

        <SimpleGrid minChildWidth='320px' spacing='40px' mt={10} mr={7} ml={7}>

          <Box>
            <Heading size='md'>
              Victims gender
            </Heading>
            <DonutChart data={donutArray} labels={['Female', 'Male', 'Other']}/>
          </Box>

          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type='bar'
            height={350}
          />
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type='line'
            height={350}
          />
        </SimpleGrid>
      </Flex>

      <Divider/>

      <Flex flexDir='column' mt={10} mb={10}>
        <Center>
          <Card>
            <CardHeader>
              <Heading as='h2'>
                Crime table
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table variant='striped'>
                  <TableCaption> Crime </TableCaption>
                  <Thead>
                    <Tr>
                      <Th> ID </Th>
                      <Th> Crime desc </Th>
                      <Th> Weapon Desc </Th>
                      <Th> Location </Th>
                    </Tr>
                  </Thead>
                  {crimes && crimes.length > 0 ? (
                    <Tbody>
                      {crimes.map((crime, index) => (
                        <Tr key={index}>
                          <Td> {crime._id} </Td>
                          <Td> {crime["Crm Cd Desc"]} </Td>
                          <Td> {crime["Weapon Desc"]} </Td>
                          <Td> {crime.LOCATION} </Td>
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
        </Center>
      </Flex>
    </>
  );
}

export default Dashboard;
