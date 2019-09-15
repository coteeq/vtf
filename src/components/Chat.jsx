import React, { Component } from 'react';
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const useStyles = theme => ({
  list: {
    marginBottom: theme.spacing(2),
    border: '1px solid gray',
    maxHeight: '300px',
    overflowY: 'scroll',
  },
});

class Chat extends Component {
  fetchQuery = gql`
    query {
      sections(id:${this.props.sectionId}) {
        messages {
          user {
            email
          }
          content
        }
      }
    }
  `;

  postQuery = gql`
    mutation Message($content:String!, $user_id:String!) {
      message(content:$content,user_id:$user_id,section_id:"${this.props.sectionId}") {
        message {
          id
        }
      }
    }
  `;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: "",
      fetchQuery: this.fetchQuery,
    };

    setInterval(() => this.setState({ fetchQuery: this.fetchQuery }), 5000);
  }

  embedQuery = () => {
    if (this.state.fetchQuery) {
      console.log("Fetching....");
      
      return (
        <Query
          query={ this.state.fetchQuery }>
            {
              ({loading, error, data}) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                let messages = this.state.messages;
                if (data.sections.length > 0) {
                  messages = data.sections[0].messages;
                }

                this.setState({ messages: messages, fetchQuery: null });
                return null;
              }
            }
        </Query>
      );
    } else {
      return null;
    }
  }

  handleInput = ev => this.setState({ currentMessage: ev.target.value });

  render() {
    const { classes } = this.props;
    console.log(this.state);

    return (
      <>
        { this.embedQuery() }

        <List className={ classes.list }>
          {
            this.state.messages.map((msg, i) => (
              <div key={i}>
                <Divider variant="middle" component="li" />
                <ListItem>
                  <ListItemText
                    primary={ msg.user.email }
                    secondary={ msg.content } />
                </ListItem>
              </div>
            ))
          }
        </List>
      
        <Grid container>
          <Grid item xs={6}>
            <TextField placeholder="Ваше сообщение" onChange={ this.handleInput } fullWidth/>
          </Grid>
          <Grid item xs={1}>
            <Mutation
              mutation={ this.postQuery }
              variables={{
                content: this.state.currentMessage,
                user_id: sessionStorage.getItem('user_id'),
              }}>
                {
                  (mutationHook, {loading, data}) => {
                    const button = (
                      <IconButton onClick={ mutationHook } color="primary">
                        <Send />
                      </IconButton>
                    );

                    if (loading) return <div>Fetching</div>
                    return button;
                  }
                }
            </Mutation>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Chat);