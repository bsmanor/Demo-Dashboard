import React, { Component } from 'react';
// import Firebase
import * as firebase from 'firebase';
// importing material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

export default class AddNewAgent extends Component {

  constructor() {
    super();
    this.state = {
      uid: null
    }
  }

  signUp = (e) => {
    let email = this.refs.agentEmail.input.value;
    let password = this.refs.agentPassword.input.value;
    // set Firebase and create new user
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.addAgent(user.uid)
      })
      .catch(error => {
        if(error.code === 'auth/email-already-in-use') {
          alert(error.message)
        } else if(error.code === 'auth/weak-password') {
          alert(error.message)
        }
    })
  };

  addAgent = (userId) => {

    let uid = userId;
    let firstName = this.refs.agentFirstName.input.value;
    let lastName = this.refs.agentLastName.input.value;
    let email = this.refs.agentEmail.input.value;

    // create new agent node on firebase
    firebase.database().ref().child('agents').child(uid).set({
      uid: uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      permissions: 'default',
      avatarUrl: 'https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__340.png',
      currentState: 'Away',
      openTickets: Math.floor((Math.random() * 10))
    })
    this.props.openSnack('AGENT ADDED');

    // function that turns strings to camelCase strings, for creating keys for state names.
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    }
    // add default states to the new agent
    const statesRef = firebase.database().ref().child('states');
    statesRef.on('value', snap => {
      for(let i in snap.val()) {
        let state = snap.val()[i]
        if(state.viewOnTasks === true) {
          firebase.database().ref().child('agents').child(uid).child('states').child(i).set({
            stateId: i,
            key: camelize(state.name),
            name: state.name,
            state: false,
            viewOnTasks: state.viewOnTasks
          })
        }
      }
    });
    this.refs.agentFirstName.input.value = null;
    this.refs.agentLastName.input.value = null;
    this.refs.agentEmail.input.value = null;
    this.refs.agentPassword.input.value = null;
  }

  render() {

    const textUnderLine = {
      width: 150
    }

    return (
        <Card className="card">
          <CardHeader title={"ADD NEW AGENT"} />
          <CardText className="flexRowStart">
            <TextField
              underlineStyle={textUnderLine}
              id="agentFirstName"  type="text" ref="agentFirstName" hintText="Name" floatingLabelText="First Name" /><br/>
            <TextField
              underlineStyle={textUnderLine}
              id="agentLastName"  type="text" ref="agentLastName" hintText="Last Name" floatingLabelText="Last Name" /><br/>
            <TextField
              underlineStyle={textUnderLine}
              id="agentEmail"  type="text" ref="agentEmail" hintText="Email" floatingLabelText="Email" /><br/>
            <TextField
              underlineStyle={textUnderLine}
              id="agentPassword"  type="password" ref="agentPassword" hintText="Password" floatingLabelText="Password" /><br/>
          </CardText>
          <CardActions>
            <RaisedButton
              label="ADD NEW AGENT"
              secondary={true}
              disabled={false}
              onClick={this.signUp}
            />
          </CardActions>
        </Card>
    );
  }
}
