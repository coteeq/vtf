import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Container,
  IconButton,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import LogoBar from './LogoBar';
import Chat from './Chat';

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
    margin: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  titlecard: {
    minWidth: '100%',
    display: 'inline-block',
  },
});

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Договор №1337",
      creationDate: "29.01.2020",
      creator: "Аааа Ббббб Ввввв",
      ongoing: true,
      questions: [
        {
          id: 1,
          title: "Статья 1.1",
        },
        {
          id: 2,
          title: "Статья 2.1",
        },
      ],
      answers: {
        1: "none",
        2: "none",
      },
    };
  }

  handleChange = id => ev => {
    let newAnswers = { ...this.state.answers };
    newAnswers[id] = ev.target.value;
    this.setState({ answers: newAnswers });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <LogoBar />

        <Container>
          <Card className={ classes.titlecard }>
            <div className={ classes.topPart }>
              <div>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    { this.state.title }
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Автор дискуссии: { this.state.creator }
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Дата создания: { this.state.creationDate }
                  </Typography>
                  <Typography variant="body2" component="p">
                     Дискуссия { this.state.ongoing ? "в процессе" : "закончена" }
                  </Typography>
                </CardContent>
              </div>
              <IconButton className={ classes.pdfButton } color="secondary">
                <PictureAsPdf />
              </IconButton>
            </div>
          </Card>
          <div className={ classes.topPart }>
          </div>

          {
            this.state.questions.map((q, i) => (
              <Card className={ classes.card } key={ q.id }>
                <CardHeader title={ q.title } />

                <CardContent>
                  <Chat />
                </CardContent>

                <CardActions>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup name="answer" value={ this.state.answers[q.id] } onChange={ this.handleChange(q.id) }>
                      <FormControlLabel value="yes" control={<Radio />} label="Да" />
                      <FormControlLabel value="no" control={<Radio />} label="Нет" />
                      <FormControlLabel value="none" control={<Radio />} label="Воздерживаюсь" />
                    </RadioGroup>
                  </FormControl>
                </CardActions>
              </Card>
            ))
          }
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Discussion);
