import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Dashboard from '..'
import { Store, AnyAction } from '@reduxjs/toolkit'

describe('With React Testing Library', () => {
  const initialState = { table: { filteredData: null } }
  const mockStore = configureStore()
  let store: Store<any, AnyAction>

  it('Shows dashboard page', async () => {
    store = mockStore(initialState)
    const { getByTestId } = await waitFor(() =>
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      )
    )

    expect(getByTestId('dashboard')).not.toBeNull()
  })
})
