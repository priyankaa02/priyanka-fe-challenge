import React from 'react'
import { Flex, FormControl, FormLabel } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'

import { TeamsData } from '../../../types/teams-data'

type Data = {
  data: TeamsData[]
  searchTeam: (name: string) => void
}

export const AutoCompleteInputBox = ({ data, searchTeam }: Data) => {
  return (
    <Flex pt="8" justify="center" align="center" w="full">
      <FormControl>
        <FormLabel>Search your team</FormLabel>
        <AutoComplete onSelectOption={(val) => searchTeam(val?.item?.value)}>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            {data?.map((item, index) => (
              <AutoCompleteItem
                key={`option-${index}`}
                value={item?.name}
                textTransform="capitalize"
              >
                {item?.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
  )
}
