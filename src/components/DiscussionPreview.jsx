import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(3),
  },
});

class DiscussionPreview extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={ classes.paper }>
        <Typography variant="h3" className={ classes.header }>
          { this.props.title }
        </Typography>

        <Typography variant="subtitle2">
          Дата создания: { this.props.creationDate }
        </Typography>
        <Typography variant="subtitle2">
          Субъект дискуссии: { this.props.subject }
        </Typography>
        <Typography variant="subtitle2">
          Cтатус дискуссии: { this.props.ongoing ? "В процессе" : "Закончена" }
        </Typography>

        {
          this.props.description ? 
          <Typography className={ classes.description }>
            { this.props.description }
          </Typography> :
          <></>
        }

      </Paper>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DiscussionPreview);