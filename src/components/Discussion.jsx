import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Container,
  IconButton,
  Grid,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import LogoBar from './LogoBar';

const useStyles = theme => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  secondaries: {
    marginBottom: theme.spacing(4),
  },
  icongrid: {
    //display: 'flex',
    //alignItems: 'flex-start',
    //justifyContent: 'flex-end',
  }
});

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Договор №1337",
      creationDate: "29.01.2020",
      creator: "Лысенко Иван Егорович",
      ongoing: true,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <LogoBar />

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={11}>
              <Typography className={ classes.header } variant="h2">{ this.state.title }</Typography>
              
              <div className={ classes.secondaries }>
                <Typography variant="h5" color="textSecondary">
                  Дата создания: { this.state.creationDate }
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  Автор дискуссии: { this.state.creator }
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  { this.state.ongoing ? "Дискуссия в процессе" : "Дискуссия закончена" }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={1} className={ classes.icongrid }>
              <IconButton color="secondary">
                <PictureAsPdf />
              </IconButton>
            </Grid>
          </Grid>

          <Card>
            <CardHeader title="Статья 1.1." />
            <CardActions>
              <Button color="primary">Да</Button>
              <Button color="primary">Нет</Button>
            </CardActions>
          </Card>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Discussion);
