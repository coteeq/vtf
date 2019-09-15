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
import { Query } from 'react-apollo';
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
  queryString = gql`
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

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: null,
      postQuery: this.queryString,
    };

    setInterval(() => this.setState({ postQuery: this.queryString }), 5000);
  }

  embedQuery = () => {
    if (this.state.postQuery) {
      return (
        <Query
          query={ this.state.postQuery }>
            {
              ({loading, error, data}) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                if (data.sections.length > 0) {
                  this.setState({ messages: data.sections[0].messages, postQuery: null });
                }

                return null;
              }
            }
        </Query>
      )
    } else {
      return null;
    }
  }

  handleInput = ev => this.setState({ currentMessage: ev.target.value });

  render() {
    const { classes } = this.props;

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
            <IconButton color="primary">
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Chat);