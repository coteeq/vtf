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
  Chip,
  Button,
  Modal,
  Fab,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LogoBar from './LogoBar';
import Chat from './Chat';
import StatsModal from './StatsModal';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
  stats: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: '1%',
    marginBottom: '1%',
  },
  radio: {
    marginLeft: '5%',
    marginBottom: '2%',
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(8),
    bottom: theme.spacing(8),
  },
});

const Finished = function () {
  const classes = makeStyles({
    card: {
      minWidth: 275,
      marginTop: 20,
      marginBottom: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })();
  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Голосование закончено
          </Typography>
          <Typography variant="h5" component="h2">
            Документ принят
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            
          </Typography>
          <Typography variant="body2" component="p">
            Секция 1: 12% против, 71% за, 17% воздержались<br />
            Секция 1: 41% против, 56% за, 13% воздержались<br />
            Секция 1: 36% против, 51% за, 13% воздержались<br />
            Секция 1: 32% против, 45% за, 23% воздержались<br />
            Секция 1: 11% против, 78% за, 21% воздержались<br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Вернуться</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

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
              <Query query={gql`query{discussions(id:9){members{id}}}`}>{
                ({ loading, error, data }) => {
                  if (loading) return <CircularProgress />
                  if (error) return <div>Error</div>  
                  return <div />
                  return data.discussions.members.map(member => {
                    return (
                      <Chip label={member.name} />
                    )
                  })
                }
              }</Query>
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
      modalOpen: false,
      questions: [
        {
          text: '1. Российская Федерация - Россия есть демократическое федеративное правовое государство с республиканской формой правления.',
          id: 1,
          title: "Секция 1.1",
          modalOpen: false,
          onModalClose: () => {this.state.questions[0].modalOpen = false;},
        },
        {
          text: '2. Наименования Российская Федерация и Россия равнозначны.',
          id: 2,
          title: "Секция 1.2",
          modalOpen: false,
          onModalClose: () => {this.state.questions[1].modalOpen = false;},
        },
      ],
      answers: {
        1: "none",
        2: "none",
      },
    };
  }

  onModalClose = () => {
    this.setState({ modalOpen: false });
  }

  handleChange = id => ev => {
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

    const querySections = gql`
      query {
        discussions(id: ${this.props.match.params.id}) {
          sections {
            id,
            title,
            description
          }
        }
      }
    `;

    return (
      <>
        <LogoBar />

        <Query query={queryDiscussion} variables={{id: this.props.match.params.id}}>
        {
          ({ loading, error, data }) => {
            if (loading) return <CircularProgress />
            if (error) return <div>Error</div>

            console.log(data);
            const items = data.discussions;
            if (!items[0])
              return (<Redirect to='/' />);

            return (
              <>
                <Container maxWidth="md">
                <HeadingCard classes={classes} data={items[0]} />
                  {
                    this.state.questions.map((q, i) => (
                      <Card className={ classes.card } key={ q.id }>
                        <CardHeader title={ q.title } />

                        <CardContent>
                          <Typography>{q.text}<br/><br/></Typography>

                          <Chat sectionId={ q.id } />
                        </CardContent>

                        <CardActions>
                          <FormControl component="fieldset" className={classes.formControl}>
                            <RadioGroup className={ classes.radio } name="answer" value={ this.state.answers[q.id] } onChange={ this.handleChange(q.id) }>
                              <FormControlLabel value="yes" control={<Radio />} label="Да" />
                              <FormControlLabel value="no" control={<Radio />} label="Нет" />
                              <FormControlLabel value="none" control={<Radio />} label="Воздерживаюсь" />
                            </RadioGroup>
                          </FormControl>
                          <Button variant="outlined" className={ classes.stats } onClick={() => {this.setState({ modalOpen: true })}}>статистика</Button>
                          <StatsModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} />
                        </CardActions>
                      </Card>
                    ))
                  }
                <Finished />

                </Container>
                <Fab onClick={ () => {} } color="secondary" className={ classes.fab }>
                  <PersonAddIcon />
                </Fab>
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
