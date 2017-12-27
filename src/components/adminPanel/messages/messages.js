import React, { Component } from 'react';
// import Firebase
import * as firebase from 'firebase';
// Importing Moment.js
import moment from 'moment';
// Materiual UI components
import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class AddNewMessages extends Component {

  constructor() {
    super();
    this.state = {
      agent: null,
      // messages related states
      title: null,
      body: null

    }
  }

  componentWillMount = () => {
    let agentRef = firebase.database().ref().child('agents').child(this.props.user.uid);
    agentRef.on('value', snap => {
      this.setState({agent: snap.val()})
    })
  }
  

  // Function for saving new messages
  addMessage = (e) => {

    // create message object
    let message = {
      dateCreated: moment().format(),
      dateCreatedUnixTimestamp: moment().format('X'),
      createdByAgentID: this.state.agent.uid,
      createdByAgentName: this.state.agent.firstName + ' ' + this.state.agent.lastName,
      title: this.refs.newMessageTitle.input.refs.input.value,
      body: this.refs.newMessageBody.input.refs.input.value,
      state: 'view',
      isModified: false
    }

    // Get a key for a new Post
    let newMessageKey = firebase.database().ref().child('messages').push().key;
    // push message object to firebase' 'messages' node.
    firebase.database().ref().child('messages').child(newMessageKey).set(message);
    // push the message ID firebase' 'agents > myMessages' node.
    firebase.database().ref().child('agents').child(this.props.user.uid).child('myMessages').push(newMessageKey);
  }
  
  // Function for editing messages

  // Function for deleting messages



  render() {

    let styles = {
      mainContainer: {
        height: 'auto',
        display: 'flex', 
        justifyContent: 'center',
        //alignItems: 'center',
        fontSize: this.props.styles.defaultTextSize.fontSize
      },
      mainCardContainer: {
        //alignSelf: 'center',
        height: 400,
        width: '100%'
      },
      cardHeader: {
        //borderBottom: 'solid 2px' + this.props.styles.accent3
      },
      marginRight: {
        marginRight: 15
      },
      textColor: {
        color: this.props.styles.textColor,
        fontSize: this.props.styles.defaultTextSize.fontSize
      },
      underlineStyle: {
        width: 500
      }
    }

    return (
      <div style={styles.mainContainer}>
        <Card style={styles.mainCardContainer}>
        <CardHeader style={styles.cardHeader} titleStyle={this.props.styles.cardHeaderTitle} title="What's On Your Mind?"/>
          <CardText>
            <TextField
              type="text"
              fullWidth={true}
              id="newMessageTitle"
              floatingLabelText="Title"
              multiLine={true}
              style={styles.marginRight}
              textareaStyle={styles.textColor}
              floatingLabelStyle={styles.textColor}
              underlineStyle={styles.underlineStyle}
              ref="newMessageTitle"
              /><br/>
            <TextField
              type="text"
              fullWidth={true}
              id="newMessageBody"
              floatingLabelText="Content"
              multiLine={true}
              floatingLabelStyle={styles.textColor}
              underlineStyle={styles.underlineStyle}
              ref="newMessageBody"
            />
          </CardText>

          <CardActions>
            <RaisedButton label="Add Message" secondary={true} onClick={this.addMessage} />
          </CardActions>

        </Card>

        {this.state.test}
      </div>
    );
  }
}
