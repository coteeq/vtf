import React, { Component } from 'react';
import { Modal, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

class CreationModal extends Component {
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
            <Card>
              <CardHeader title="Создать новое обсуждение" />
              <CardContent>
                <Typography>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quaerat a beatae nesciunt sit. Accusantium, numquam! Ratione id impedit debitis aliquid, repudiandae fugit earum asperiores eius, omnis atque perspiciatis doloremque.
                </Typography>
              </CardContent>
            </Card>
          </Fade>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(CreationModal);