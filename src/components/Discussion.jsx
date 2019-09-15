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
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import LogoBar from './LogoBar';
import Chat from './Chat';
import { Redirect } from 'react-router-dom';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

class HeadingCard extends Component {
  render() {
    if (!sessionStorage.getItem('user_id'))
      return (<Redirect to='/login' />);

    const { classes } = this.props;
    const creator = this.props.data.creator;
    const title = this.props.data.name;
    const creationDate = this.props.data.creation_date;
    const ongoing = new Date() < new Date(this.props.data.deadline);

    return (
      <Card className={ classes.titlecard }>
        <div className={ classes.topPart }>
          <div>
            <CardContent>
              <Typography variant="h5" component="h2">
                { title }
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Автор дискуссии: { creator }
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Дата создания: { new Date(creationDate).toLocaleString('ru-RU', { timeZone: 'UTC' }) }
              </Typography>
              <Typography variant="body2" component="p">
                 Дискуссия { ongoing ? "в процессе" : "закончена" }
              </Typography>
            </CardContent>
          </div>
          <IconButton className={ classes.pdfButton } color="secondary">
            <PictureAsPdf />
          </IconButton>
        </div>
      </Card>
    );
  }
}

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    alert('need query');
    let newAnswers = { ...this.state.answers };
    newAnswers[id] = ev.target.value;
    this.setState({ answers: newAnswers });
  };

  render() {
    const { classes } = this.props;
    const queryDiscussion = gql`
      query {
        discussions(id: ${this.props.match.params.id}) {
          name,
          description,
          creation_date,
          deadline,
          creator_id
        }
      }
    `;

    return (
      <>
        <LogoBar />

        <Query query={queryDiscussion} variables={{id: this.props.match.params.id}}>
        {
          ({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            console.log(data);
            const items = data.discussions;
            if (!items[0])
              return (<Redirect to='/' />);

            return (
              <>
                <HeadingCard classes={classes} data={items[0]} />
                <Container>
                  {
                    this.state.questions.map((q, i) => (
                      <Card className={ classes.card } key={ q.id }>
                        <CardHeader title={ q.title } />

                        <CardContent>
                          <Chat sectionId={ q.id } />
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
            )
          }
        }
        </Query>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Discussion);
