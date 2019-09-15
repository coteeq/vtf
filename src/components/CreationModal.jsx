import React, { Component } from 'react';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: '50vw',
    padding: theme.spacing(2),
  }
});

class CreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      date: new Date(),
    };
  }

  handleTextInput = name => ev => this.setState({ [name]: ev.target.value });
  handleDateInput = date => this.setState({ date: date });

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({
      post_query: gql`
        query discussion($title: String, $description: String, $deadline: DateTime) {
          discussion(
            d_name:$title,
            d_description:$description,
            d_deadline:$deadline
          )
        }`
    });
  }

  embedQuery = () => {
    if (this.state.post_query)
      return (<Query
        query={this.state.post_query}
        variables={{
          title: this.state.title,
          description: this.state.description,
          deadline: this.state.date,
        }}
        >{({ loading, error, data }) => {
              if (loading) return <CircularProgress />
              if (error) return <div>Error</div>

              window.location.reload();
            }}</Query>);
  }

  render() {
    const { classes } = this.props;

    return (
      <Modal
        className={ classes.modal }
        open={ this.props.modalOpen }
        onClose={ this.props.onModalClose }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
          <Fade in={ this.props.modalOpen }>
            <form>
              <Card className={ classes.card }>
                <CardHeader title="Создать новую дискуссию" />
                <CardContent>
                    {this.embedQuery()}
                    <FormControl fullWidth={ true }>
                      <TextField
                        label="Название дискуссии"
                        onChange={ this.handleTextInput("title") }
                        margin="dense"
                        required />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="dense"
                          label="Дедлайн"
                          value={ this.state.date }
                          onChange={ this.handleDateInput }
                          required />
                      </MuiPickersUtilsProvider>
                      <TextField
                        label="Описание"
                        onChange={ this.handleTextInput("description") }
                        margin="dense"
                        rows={ 6 }
                        multiline
                        required />
                    </FormControl>
                </CardContent>

                <CardActions>
                  <Button type="submit" color="primary" onClick={ this.handleSubmit }>Создать</Button>
                </CardActions>
              </Card>
            </form>
          </Fade>
      </Modal>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CreationModal);