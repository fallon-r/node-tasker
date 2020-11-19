import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { MemoryRouter, Route, Switch, Link } from 'react-router-dom'
import UserLogin from './components/UserLogin'


const App = () => {
  return (
    <ChakraProvider>
      <MemoryRouter>
      <Switch>
          <Route exact path="/" component={UserLogin} />
      </Switch>
      </MemoryRouter>
    </ChakraProvider>
  )
}

export default App

