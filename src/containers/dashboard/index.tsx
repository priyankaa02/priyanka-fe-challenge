import React, { useEffect } from 'react'
import {
  Center,
  Text,
  Spinner,
  Box,
  ListItem,
  UnorderedList,
  Heading,
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchTeamsData,
  searchByName,
  fetchStandingsData,
} from '../../states/football/football-slice'

import { AutoCompleteInputBox } from './elements/input'
import { Info } from './elements/info'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const teamsData = useAppSelector((state) => state.football.teamsData)
  const filteredData = useAppSelector((state) => state.football.filteredData)
  const standingsData = useAppSelector((state) => state.football.standingsData)
  const status = useAppSelector((state) => state.football.status)
  const error = useAppSelector((state) => state.football.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeamsData())
      dispatch(fetchStandingsData())
    }
  }, [status, dispatch])

  const searchTeam = (name: string) => {
    dispatch(searchByName(name))
  }

  return (
    <Center
      p={5}
      data-testid={'dashboard'}
      height={'auto'}
      display={'flex'}
      flexDirection={'column'}
    >
      {status === 'loading' ? (
        <Spinner />
      ) : (
        teamsData && (
          <Box width={['100%', '100%', '57%']}>
            <Heading as="h2" size="lg">
              Welcome to football club
            </Heading>
            <AutoCompleteInputBox data={teamsData} searchTeam={searchTeam} />
          </Box>
        )
      )}
      {filteredData && <Info filteredData={filteredData} />}
      {filteredData?.series &&
        filteredData?.series?.length > 0 &&
        standingsData && (
          <Box>
            <Heading as="h3" size="md">
              Other teams which played in the Premier league in season 2020-2021
            </Heading>
            <UnorderedList mt={'2'}>
              {standingsData?.slice(1, 4).map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    _hover={{ color: 'blue.600' }}
                    cursor={'pointer'}
                    onClick={() => searchTeam(item?.team?.name)}
                  >
                    {item?.team?.name}
                  </ListItem>
                )
              })}
            </UnorderedList>
          </Box>
        )}
      {error && (
        <Text fontSize="lg" align={'center'} mt={'10'}>
          {error}
        </Text>
      )}
    </Center>
  )
}

export default Dashboard
