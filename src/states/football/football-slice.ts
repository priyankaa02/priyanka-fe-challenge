import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { axiosClient } from '../../utils/api'
import { TeamsData, StandingData } from '../../types/teams-data'

// Define the state of the slice as an object
type FootballState = {
  data: {
    [key: string]: TeamsData
  }
  teamsData: TeamsData[]
  status: string
  error: string | null
  filteredData: TeamsData | null
  standingsData: StandingData[]
}

// Define an initial state
const initialState: FootballState = {
  data: {},
  teamsData: [],
  status: 'idle',
  error: null,
  filteredData: null,
  standingsData: [],
}

export const fetchTeamsData = createAsyncThunk(
  'football/fetchTeamsData',
  async () => {
    const response = await axiosClient.get('teams?limit=1000')
    return response.data
  }
)

export const fetchStandingsData = createAsyncThunk(
  'football/fetchStandingsData',
  async () => {
    const response = await axiosClient.get(
      'competitions/PL/standings?season=2021'
    )
    return response.data
  }
)

// Create a slice containing the configuration of the state
// and the reducers functions
const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {
    searchByName: (state, action) => {
      // The object you return is the full state object update in your reducer
      const filteredObj = state?.teamsData.find(
        (o: TeamsData) => o.name === action.payload
      ) as unknown as TeamsData
      const filteredStanding = state?.standingsData.find(
        (o: StandingData) => o?.team?.name === action.payload
      ) as unknown as StandingData
      const arr = filteredStanding
        ? [
            filteredStanding?.won,
            filteredStanding?.lost,
            filteredStanding?.draw,
          ]
        : []
      filteredObj['series'] = arr
      if (filteredStanding?.goalsFor && filteredStanding?.playedGames)
        filteredObj['averageGoals'] =
          filteredStanding?.goalsFor / filteredStanding?.playedGames
      state.filteredData =
        Object.keys(filteredObj).length > 0 ? filteredObj : null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTeamsData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTeamsData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.data = action.payload
        state.teamsData = action.payload?.teams
      })
      .addCase(fetchTeamsData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action?.error?.message || null
      })
      .addCase(fetchStandingsData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload?.standings.find(
          (o: any) => o.type === 'TOTAL'
        )
        state.standingsData = data?.table
      })
      .addCase(fetchStandingsData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action?.error?.message || null
      })
  },
})

// Export each reducers function defined in createSlice
export const { searchByName } = footballSlice.actions

// Export default the slice reducer
export default footballSlice.reducer
