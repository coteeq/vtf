import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Discussion from './components/Discussion.jsx';
import DiscussionsList from './components/DiscussionsList.jsx';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const httpLink = createHttpLink({
  uri: 'https://vtb.whimo.me/api',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('user_id');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function Logout () {
  sessionStorage.removeItem('user_id');
  return (
    <Redirect to="/" />
  );
}


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/discussion/:id' component={Discussion} />
          <Route exact path='/' component={DiscussionsList} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
