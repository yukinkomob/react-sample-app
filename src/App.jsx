import React, { createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Main from './pages/Main'
import Temp from './pages/Temp'

export const GoToFuncs = createContext()

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/temp/:id">
          <Temp />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
