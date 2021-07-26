import React, { createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Main from './pages/Main'
import Detail from './pages/Detail'
import QuoteApp from './pages/QuoteApp'

export const GoToFuncs = createContext()

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list">
          <QuoteApp />
        </Route>
        <Route path="/temp/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
