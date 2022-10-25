import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './App.css'

const Dashboard = React.lazy(() => import('./containers/dashboard'))
const Loading = () => <p>Loading ...</p>

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
  )
}

export default App
