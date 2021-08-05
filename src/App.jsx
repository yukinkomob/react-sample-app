import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Detail from './pages/Detail'

function App() {
  return (
    <Router>
      <Switch>
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
