import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Fade,
  Flex,
  Heading,
  Input,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import './DashboardStyles.scss'
import {Crime} from "../../types/CrimeTypes";
import {API_URL} from "../../config/constants";
import useDebounce from "../../hooks/useDebounce";


function CrimeTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [crimeLimit, setCrimeLimit] = useState(25);

  const textInput = useRef(null);
  const numberOfSkeletons = 25;
  const debouncedCrimeLimit = useDebounce(crimeLimit, 500);

  useEffect(() => {
    if (debouncedCrimeLimit) {
      fetchLimitedCrime(debouncedCrimeLimit).then(() => setIsLoading(false));
    }
  }, [debouncedCrimeLimit]);

  useEffect(() => {
    Promise.all([
      fetchLimitedCrime(25),
    ])
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const limit = parseInt(e.target.value)

    if (limit && Number.isInteger(limit)) {
      setIsLoading(true);
      setCrimeLimit(limit);
    }
  }

  function handleClick() {
   //@ts-ignore
    textInput.current.focus();
  }

  const fetchLimitedCrime = async (limit: number) => {
    await fetch(API_URL + `/crime/limit/${limit}`).then(response => {
      response.json().then(json => setCrimes(json))
    })
  }

  return (
    <>
      <Card w='100%' mr={50} ml={50}>
        <CardHeader>
          <Flex flexDir='row'>
            <Heading onClick={handleClick} cursor='pointer' w='100%'>
              Latest
              <Input
                w='unset'
                ref={textInput}
                onChange={handleChange}
                type='number'
                variant='flushed'
                size='lg'
                min={0}
                max={100000}
                defaultValue={25}
                fontSize='xx-large'
                ml={2}
                mr={3}
              />
              reported crimes
            </Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant={isLoading ? 'simple' : 'striped'} colorScheme={isLoading ? 'gray' : 'teal'}>
              <TableCaption> {crimeLimit} Crime(s) </TableCaption>
              <Thead>
                <Tr>
                  <Th> ID </Th>
                  <Th> Crime description </Th>
                  <Th> Weapon Used </Th>
                  <Th> Location </Th>
                  <Th> Date </Th>
                </Tr>
              </Thead>
              {!isLoading && crimes && crimes.length > 0 ? (
                <Tbody>
                  {crimes.map((crime, index) => (
                    <Tr key={index}>
                      <Td> {crime.DR_NO} </Td>
                      <Td> {crime["Crm Cd Desc"]} </Td>
                      <Td> {crime["Weapon Desc"]} </Td>
                      <Td> {crime.LOCATION} </Td>
                      <Td>{new Date(crime["Date Rptd"]).toLocaleDateString('en-GB')}</Td>
                    </Tr>
                  ))}
                </Tbody>
              ) : (
                <Tbody>
                  {Array.from({length: numberOfSkeletons}, (_, index) => (
                    <Tr key={index}>
                      <Td colSpan={5}>
                        <Fade in={isLoading}>
                          <Skeleton h={50} isLoaded={!isLoading}/>
                        </Fade>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default CrimeTable;
