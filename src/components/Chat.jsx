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
  render() {
    const { classes } = this.props;

    return (
      <>
        <List className={ classes.list }>
          <ListItem>
            <ListItemText
              primary="User1"
              secondary="Message Message Message..." />
          </ListItem>

          <Divider variant="middle" component="li" />

          <ListItem>
            <ListItemText
              primary="User1"
              secondary="Message Message Message..." />
          </ListItem>

          <Divider variant="middle" component="li" />

          <ListItem>
            <ListItemText
              primary="User1"
              secondary="Message Message Message..." />
          </ListItem>
        </List>
      
        <Grid container>
          <Grid item xs={6}>
            <TextField fullWidth/>
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