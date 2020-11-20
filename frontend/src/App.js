import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserCreate from './components/UserCreate'


const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={UserLogin} />
          <Route path="/create" component={UserCreate} />
      </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

