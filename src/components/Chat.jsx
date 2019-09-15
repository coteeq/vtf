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

const useStyles = theme => ({
  list: {
    marginBottom: theme.spacing(2),
    border: '1px solid gray',
    maxHeight: '300px',
    overflowY: 'scroll',
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User1', message: 'Message Message Message...' },
        { user: 'User2', message: 'Message...' },
      ],
      currentMessage: null,
    };
  }

  handleInput = ev => this.setState({ currentMessage: ev.target.value });

  render() {
    const { classes } = this.props;

    return (
      <>
        <List className={ classes.list }>
          {
            this.state.messages.map((msg, i) => (
              <div key={i}>
                <Divider variant="middle" component="li" />
                <ListItem>
                  <ListItemText
                    primary={ msg.user }
                    secondary={ msg.message } />
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