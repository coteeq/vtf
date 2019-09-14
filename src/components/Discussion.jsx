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
  topPart: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  pdfButton: {
    alignSelf: 'start',
  },
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
          <div className={ classes.topPart }>
            <div>
              <Typography className={ classes.header } variant="h2">{ this.state.title }</Typography>
              
              <div>
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
            </div>

            <IconButton className={ classes.pdfButton } color="secondary">
              <PictureAsPdf />
            </IconButton>
          </div>

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
