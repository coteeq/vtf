import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';

const useStyles = theme => ({
  card: {
    margin: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(1),
  }
});

class DiscussionPreview extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={ classes.card }>
        <CardHeader
          title={ this.props.title }
          subheader={ `Дата создания: ${this.props.creationDate}` } />

        <CardContent>
          <Typography variant="subtitle2">
            Субъект дискуссии: { this.props.subject }
          </Typography>
          <Typography variant="subtitle2" color="secondary">
            { this.props.ongoing ? "Дискуссия в процессе" : "Дискуссия закончена" }
          </Typography>

          {
            this.props.description ? 
            <Typography color="textSecondary" className={ classes.description }>
              { this.props.description }
            </Typography> :
            <></>
          }
        </CardContent>
        <CardActions>
          <Button color="primary">Присоединиться</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DiscussionPreview);