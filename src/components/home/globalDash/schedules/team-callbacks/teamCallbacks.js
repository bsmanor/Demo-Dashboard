import React, { Component } from 'react';
import '../../../../../App.css';
import { Link } from 'react-router-dom';
import AddCallback from '../../../../adminPanel/editUpcomingCallbacks/addCallback';
// import Firebase
import * as firebase from 'firebase';
// Importing Moment.js
import moment from 'moment';
// Materiual UI components
import {Card, CardText, CardHeader} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem } from 'material-ui/List';
import CommunicationCall from 'material-ui/svg-icons/communication/call';

export default class TeamCallbacks extends Component {

  constructor() {
    super();
    this.state = {
      // Dialogs related states
      addCallbackDialogState: false,
      deleteCallbackDialogState: false,
      // state for a specific callback ID selected, for the editCallback function
      currentCallbackId: null
    }
  }

  // ---------  functions for handleing the Add and Remove dialogs status  ------------- //
  handleAddDialogOpen = () => {
    this.setState({addCallbackDialogState: true});
  };
  handleAddDialogClose = () => {
    this.setState({addCallbackDialogState: false});
  };
  handleDeleteDialogOpen = (i) => {
    this.setState({
      deleteCallbackDialogState: true,
      currentCallbackId: i
    });
  };
  handleDeleteDialogClose = () => {
    this.setState({deleteCallbackDialogState: false});
  };
// ----------------------------  end of dialog handle functions  ---------------------------- //


// ----------------------------  Casllbacks CRUD functions  ---------------------------- //
  setCallbackId = (i) => {
    this.setState({currentCallbackId: i})
  };
  editCallback = (i) => {
    firebase.database().ref().child('callbacks').child(i).child('state').set('edit');
  };
  deleteCallback = () => {
    firebase.database().ref().child('callbacks').child(this.state.currentCallbackId).remove();
  };
  updateCallbackStatusDone = (i) => {
    firebase.database().ref().child('callbacks').child(i).child('status').set('done');
  };
  // ----------------------------  end of CRUD functions  ---------------------------- //


  render() {

    const styles = {
      cardContainer: {
        width: "auto",
        height: '100%'
      },
      callbackCard: {
        width: 200
      },
      callbacksList: {
        padding: 0,
        height: this.props.schedulesInnerBodyHeight,
        overflowY: 'auto'
      },
      deleteIcon: {
        color: this.props.styles.danger,
        float: 'right',
        cursor: 'pointer'
      },
      addButton: {
        zDepth: 3      
      },
      messageTitle: {
        color: this.props.styles.subTextColor
      },
      requestedBy: {
        color: this.props.styles.disabledTextColor
      },
      messageBody: {
        color: this.props.styles.textColor
      },
      buttonMargin: {
        marginRight: 15
      }
    }

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    let callbacks = [];
    let callbacksRef = firebase.database().ref().child('callbacks');
    callbacksRef.on('value', snap => {
      if(snap.val() === null) {
          callbacks.push(
            <h3 key="noCallbacks" style={{textAlign:'center', color: this.props.styles.accent3}}>There are no upcoming callbacks</h3>
          )
      } else {
        // loop through each callback
        for(let i in snap.val()) {
          let callback = snap.val()[i]
          if(callback.status === 'pending') {
            callbacks.push(
              <ListItem key={i}
                leftIcon={<CommunicationCall />}
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <a href={callback.url} className="link" target="_blank">
                      <MenuItem primaryText="Ticket" leftIcon={<FontIcon className="material-icons">mail</FontIcon>} />
                    </a>
                    <MenuItem primaryText="Done" leftIcon={<FontIcon className="material-icons">done</FontIcon>} onClick={() => this.updateCallbackStatusDone(i) } />
                    {/* <MenuItem primaryText="Edit" leftIcon={<FontIcon className="material-icons">edit</FontIcon>} /> */}
                    <MenuItem primaryText="Delete" leftIcon={<FontIcon className="material-icons">delete</FontIcon>} onClick={() => this.handleDeleteDialogOpen(i)} />
                  </IconMenu>
                }
                primaryText={
                  <span style={styles.messageTitle}>{callback.networkId}
                    <span style={styles.requestedBy}> {callback.requestedBy}</span>
                  </span>}
                secondaryText={<p><span style={styles.messageBody}>{callback.day + ', ' + callback.date + ', ' + callback.hour}</span></p>}
                secondaryTextLines={2}
              />
            )
          }
        }
      }
    })

    return (
      <div style={styles.cardContainer}>
        <Card style={styles.cardContainer}>
        {this.props.mq ? <CardHeader className="cardHeader" title="UPCOMING CALLBACKS" titleStyle={this.props.styles.cardHeaderTitle} /> : null}
          <CardText>
            <List style={styles.callbacksList}>{callbacks}</List>
            <Link to={'/admin/callback'}><FloatingActionButton style={styles.addButton} mini={true}>
              <ContentAdd />
              {/* <ContentAdd onClick={this.handleAddDialogOpen}/> */}
            </FloatingActionButton></Link>
          </CardText>
        </Card>

        {/* ------------------------------------------------------------------------------------------------------------------- */}
        {/* -----------------------------------------------------  Dialogs  --------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------------------------- */}

        {/* Dialog for adding for adding a new callback */}
        <Dialog
          actions={[
            <RaisedButton primary={true} style={styles.buttonMargin} onClick={this.handleAddDialogClose} label="CANCEL" />,
          ]}
          modal={true}
          open={this.state.addCallbackDialogState}
          onRequestClose={this.handleAddDialogOpen}
        >
          <AddCallback openSnack={this.props.openSnack} styles={this.props.styles} user={this.props.user}/>
        </Dialog>

        {/* Dialog for delete callback */}
        <Dialog
          title="Are you sure?"
          actions={[
            <RaisedButton primary={true} style={styles.buttonMargin} onClick={this.handleDeleteDialogClose} label="CANCEL" />,
            <RaisedButton onClick={this.deleteCallback} secondary={true} label="YES" />
          ]}
          open={this.state.deleteCallbackDialogState}
          onRequestClose={this.handleDeleteDialogOpen}
        >
        </Dialog>
      {/* ------------------------------------------------------------------------------------------------------------------- */}
      </div>
    );
  }
}
