import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VTB from '../images/vtb.svg';
import DiscussionPreview from './DiscussionPreview';
import CreationModal from './CreationModal';

const useStyles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(8),
    bottom: theme.spacing(8),
  },
});

class DiscussionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onButtonClick() {
    this.setState({
      modalOpen: true,
    });
  }

  onModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar position="sticky">
          <Toolbar className={ classes.toolbar }>
            <img src={ VTB } alt="VTB" />
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" className={ classes.container }>
          <DiscussionPreview
            title="Договор №1337"
            subject="Джотаро Куджо"
            creationDate="29.01.2020"
            ongoing={ true }
            description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis autem dolor amet possimus repudiandae aliquam beatae doloribus ut natus nemo vel neque deleniti, dolore rem, explicabo sequi accusantium. Minus, eum!"} />
          
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          <DiscussionPreview
            title="Договор №1338"
            subject="Джолин Куджо"
            creationDate="29.01.2022"
            ongoing={ false }/>
          
          <Fab onClick={ this.onButtonClick } color="secondary" className={ classes.fab }>
            <AddIcon />
          </Fab>
        </Container>

        <CreationModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} />
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DiscussionsList);