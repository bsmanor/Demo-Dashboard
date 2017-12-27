import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddNewMessages from '../../../../adminPanel/messages/messages';
// import Firebase
import * as firebase from 'firebase';
// Importing Moment.js
import moment from 'moment';
// Materiual UI components
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

class Messages extends Component {

  constructor() {
    super();
    this.state = {
      // Message related
      currentMessageId: null,
      // Dialogs related
      addMessageDialogState: false,
      editMessageDialogState: false,
      deleteMessageDialogState: false
    }
  }
// ------------------------------------------------------------------------------ //
  // functions for handleing the Add and Remove dialogs status
  handleAddDialogOpen = () => {
    this.setState({addMessageDialogState: true});
  };
  handleAddDialogClose = () => {
    this.setState({addMessageDialogState: false});
  };
  handleDeleteDialogOpen = (i) => {
    this.setState({
      deleteMessageDialogState: true,
      currentMessageId: i
    });
  };
  handleDeleteDialogClose = () => {
    this.setState({deleteMessageDialogState: false});
  };
// end of dialog handle functions
// ------------------------------------------------------------------------------ //


// ------------------------------------------------------------------------------ //
// messages CRUD functions
  addNewMessage = () => {
  }
  deleteMessage = (messageId) => {
    firebase.database().ref().child('messages').child(messageId).remove();
  };
  editMessage = (i) => {
    firebase.database().ref().child('messages').child(i).child('state').set('edit');
  };
  saveUpdatedMessage = (i) => {
    firebase.database().ref().child('messages').child(i).child('title').set(this.refs.updatedMessageTitle.input.value);
    firebase.database().ref().child('messages').child(i).child('body').set(this.refs.updatedMessageBody.input.refs.input.value);
    firebase.database().ref().child('messages').child(i).child('state').set('view');
  }
  undoEditMessage = (i) => {
    firebase.database().ref().child('messages').child(i).child('state').set('view');
  }
  // End of messages CRUD functions
  // ------------------------------------------------------------------------------ //

  render() {

    let styles = {
      mainContainer: {
        height: '100%',
        overflowY: 'auto'
      },
      messagesList: {
        padding: 0,
        height: this.props.schedulesInnerBodyHeight,
      },
      messageTitle: {
        color: this.props.styles.subTextColor
      },
      dateCreatedStyle: {
        fontSize: '80%',
        color: this.props.styles.disabledTextColor
      },
      messageBody: {
        color: this.props.styles.textColor
      },
      buttonMargin: {
        marginRight: 15
      },
      addButton: {
        zDepth: 3      
      },
      editMessageButtons: {
        float: 'right'
      },
      doneEditButton: {
        color: this.props.styles.success
      },
      clearEditButton: {
      },
      editMessageTextFields: {
        color: this.props.styles.subTextColor
      }
    }

    // Dialogs buttons
    const deleteMessageDialogButtons = [
      <RaisedButton primary={true} style={styles.buttonMargin} onClick={this.handleDeleteDialogClose} label="CANCEL" />,
      <RaisedButton onClick={() => this.deleteMessage(this.state.currentMessageId)} secondary={true} label="YES" />
    ];

    // Message's menu icons and properties
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    // Pull and loop through all messages
    let messagesRef = firebase.database().ref().child('messages');
    let messages = [];
    messagesRef.on('value', snap => {
      for(let i in snap.val()) {
        let message = snap.val()[i]
        let agent
        let agentRef = firebase.database().ref().child('agents').child(message.createdByAgentID)
        agentRef.on('value', snap2 => {
          agent = snap2.val()
        })
        // Check whether each message state is View or Edit.
        // If status is View - message will be rendered as a list item.
        // If status is Edit - message will be rendered as an input text field, with the current content populated in it.
        // When state === View:
        if(message.state === 'view'){
          messages.push(
              <ListItem key={i}
                leftAvatar={<Avatar src={agent.avatarUrl} />}
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem primaryText="Edit" leftIcon={<FontIcon className="material-icons">edit</FontIcon>} onClick={() => this.editMessage(i)} />
                    <MenuItem primaryText="Delete" leftIcon={<FontIcon className="material-icons">delete</FontIcon>} onClick={() => this.handleDeleteDialogOpen(i)} />
                  </IconMenu>
                }
                primaryText={
                  <span style={styles.messageTitle}>{message.title} 
                    <span style={styles.dateCreatedStyle}> ({moment(message.dateCreated).format('ll')})</span>
                  </span>}
                secondaryText={<p><span style={styles.messageBody}>{message.body}</span></p>}
                secondaryTextLines={2}
              />
          )
        // When state === Edit:
        } else if(message.state === 'edit') {
          messages.push(
            <ListItem key={i}
              leftAvatar={<Avatar src={this.props.agent.avatarUrl} />}
              primaryText={
                <span>
                  <TextField 
                    textareaStyle={styles.editMessageTextFields} 
                    type="text" 
                    id="updatedMessageTitle" 
                    ref="updatedMessageTitle" 
                    floatingLabelFixed={true} 
                    floatingLabelText="Edit Mode..." 
                    defaultValue={message.title}
                  />
                  <TextField 
                    textareaStyle={styles.editMessageTextFields} 
                    type="text" 
                    id="updatedMessageBody" 
                    multiLine={true}
                    ref="updatedMessageBody" 
                    hintText="Content" 
                    defaultValue={message.body} 
                  />
                </span>
              }
              secondaryText={
                <span style={styles.editMessageButtons}>
                  <FontIcon style={styles.doneEditButton} className="material-icons" onClick={() => this.saveUpdatedMessage(i)}>done</FontIcon>
                  <FontIcon style={styles.clearEditButton} className="material-icons" onClick={() => this.undoEditMessage(i)}>clear</FontIcon>
                </span>
              }
              secondaryTextLines={2}
            />
          )
        }
      }
    })

    return (
      <div style={styles.mainContainer}>
        <Card style={styles.mainContainer}>
          {this.props.mq ? <CardHeader className="cardHeader" titleStyle={this.props.styles.cardHeaderTitle} title="MESSAGES" style={styles.cardHeader} /> : null}
          <CardText>
            <List style={styles.messagesList}>{messages}</List>
            <Link to={'/admin/messages'}><FloatingActionButton style={styles.addButton} mini={true}>
              <ContentAdd />
              {/* <ContentAdd onClick={this.handleAddDialogOpen}/> */}
            </FloatingActionButton></Link>
          </CardText>
        </Card>

        {/* ------------------------------------------------------------------------------------------------------------------- */}
        {/* -----------------------------------------------------  Dialogs  --------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------------------------- */}

        {/* Dialog for adding new message */}
        <Dialog
          actions={[
            <RaisedButton primary={true} style={styles.buttonMargin} onClick={this.handleAddDialogClose} label="CANCEL" />,
          ]}
          open={this.state.addMessageDialogState}
          onRequestClose={this.handleAddDialogOpen}
        >
          <AddNewMessages styles={this.props.styles} user={this.props.user}/>
        </Dialog>

        {/* Dialog for delete message */}
        <Dialog
          title="Are you sure?"
          actions={deleteMessageDialogButtons}
          open={this.state.deleteMessageDialogState}
          onRequestClose={this.handleDeleteDialogOpen}
        >
        </Dialog>
        {/* ------------------------------------------------------------------------------------------------------------------- */}

      </div>
    );
  }
}

export default Messages;