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
import { withStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: '50vw',
  }
};

class CreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
    };
  }

  handleTextInput = name => ev => this.setState({ [name]: ev.target.value });

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
                  <Button type="submit" color="primary">Создать</Button>
                </CardActions>
              </Card>
            </form>
          </Fade>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(CreationModal);