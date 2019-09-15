import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Discussion from './components/Discussion.jsx';
import DiscussionsList from './components/DiscussionsList.jsx';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'https://vtb.whimo.me/api'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/discussion/:id' component={Discussion} />
          <Route path='/' component={DiscussionsList} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
