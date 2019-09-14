import React from 'react';
import { 
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
  Paper,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
});

class Login extends React.Component {
  state = {
    logged_in: false,
  }

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        logged_in: false,
        login_error: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'remember_me')
      this.setState({ [event.target.id]: event.target.checked });
    else
      this.setState({ [event.target.id]: event.target.value });
  }

  componentWillMount() {
    if (sessionStorage.getItem('logged_in')) {
      this.setState({ logged_in: true });
    }
    else if (localStorage.getItem('logged_in')) {
      for (const key of ['logged_in', 'email', 'remember_me']) {
        sessionStorage.setItem(key, localStorage.getItem(key));
      }
      this.setState({ logged_in: true });
    }
    else {
      this.setState({ logged_in: false });
    }
  }

  login() {
    if (this.state.email === 'me@whimo.me') {
      sessionStorage.setItem('email', this.state.email)
      sessionStorage.setItem('logged_in', true);
      sessionStorage.setItem('remember_me', this.state.remember_me);

      if (this.state.remember_me) {
        for (const key of ['logged_in', 'email', 'remember_me']) {
          localStorage.setItem(key, sessionStorage.getItem(key));
        }
      }

      this.setState({ logged_in: true });
    }
    else {
      this.setState({ login_error: true });
    }
  }

  checkLoggedIn() {
    if (this.state.logged_in)
      return <Redirect to='/' />
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        {this.checkLoggedIn()}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              id="email"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl className={classes.formControl} error={this.state.login_error} fullWidth>
              <InputLabel htmlFor="component-error">Пароль</InputLabel>
              <Input
                id="password"
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">{this.state.login_error ? 'Неправильный пароль' : ''}</FormHelperText>
            </FormControl>
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="true" color="primary" id="remember_me" onChange={this.handleChange} />}
                  label="Запомните меня"
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.login}
                >
                  Войти
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
