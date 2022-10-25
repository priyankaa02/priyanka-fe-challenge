import { configureStore } from '@reduxjs/toolkit'

// Import all created slices
import footballSlice from '../states/football/football-slice'

// Create the store, adding the search slice to it
export const store = configureStore({
  reducer: {
    football: footballSlice,
  },
})

// Export some helper types used to improve type-checking
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
