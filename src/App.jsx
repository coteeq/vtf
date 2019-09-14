import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.jsx'
import Discussion from './components/Discussion.jsx'
import DiscussionsList from './components/DiscussionsList.jsx'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/discussion/:id' component={Discussion} />
        <Route path='/' component={DiscussionsList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
