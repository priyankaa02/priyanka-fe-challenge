import React from 'react'
import { Center, Text, Box, Image, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import ReactApexChart from 'react-apexcharts'

import { TeamsData } from '../../../types/teams-data'

type InfoProps = {
  filteredData: TeamsData | null
}

const options = {
  labels: ['won', 'lost', 'draw'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}

export const Info = ({ filteredData }: InfoProps) => {
  return (
    <Center flexDirection={'column'} padding={2}>
      {filteredData ? (
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Image
            src={filteredData.crest}
            alt={filteredData.name}
            mt={'2'}
            loading={'lazy'}
          />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                {filteredData.name}
              </Box>
            </Box>

            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {filteredData.address}
            </Box>

            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
            >
              <Link href={filteredData.website} isExternal>
                {filteredData.website} <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <Text color={'black'} fontSize="lg" align={'center'}>
          No data exist for this url <br />
          Please try again with another url value
        </Text>
      )}
      {filteredData?.series && filteredData?.series?.length > 0 && (
        <ReactApexChart
          options={options}
          series={filteredData?.series}
          type="pie"
          width="100%"
        />
      )}
      {filteredData?.averageGoals && (
        <Text color={'black'} fontSize="lg" align={'center'}>
          <b>Average goals per match:</b>{' '}
          {Math.round(filteredData?.averageGoals || 0)}
        </Text>
      )}
    </Center>
  )
}
