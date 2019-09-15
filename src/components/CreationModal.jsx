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
    };
  }

  handleTextInput = name => ev => this.setState({ [name]: ev.target.value });

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
          deadline: new Date('December 17, 1995 03:24:00')
        }}
        >{({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
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
                      <TextField
                        label="Описание"
                        onChange={ this.handleTextInput("description") }
                        margin="dense"
                        rows={ 6 }
                        multiline />
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