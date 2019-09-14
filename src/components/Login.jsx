import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

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
        email_error: '',
        password_error: '',
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
    if (this.state.email === 'qwe') {
      sessionStorage.setItem('email', this.state.email)
      sessionStorage.setItem('logged_in', true);
      sessionStorage.setItem('remember_me', this.state.remember_me);

      if (this.state.remember_me) {
        for (const key of ['logged_in', 'email', 'remember_me']) {
          localStorage.setItem(key, sessionStorage.getItem(key));
        }
      }

      this.setState({
        logged_in: true,
      });
    }
    else {
      this.setState({
        email_error: 'This is not email',
        password_error: 'Invalid password',
      });
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
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
            <TextField
              id="password"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="true" color="primary" id="remember_me" onChange={this.handleChange} />}
                  label="Remember me"
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
                  Sign In
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
