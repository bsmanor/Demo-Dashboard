import React, { Component } from 'react';
// import firebase 
import * as firebase from 'firebase';
// import material-ui components
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';

class UserStateList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agents: []
    }   
  }

  handleToggleChange = (state, event, isInputChecked) => {
    let email = this.props.user.email;
    let uid = this.props.user.uid;
    firebase.database().ref().child('agents').child(this.props.user.uid).child('states').child(state.key).child('state').set(isInputChecked);
    if(isInputChecked) {
      firebase.database().ref().child('states').child(state.stateId).child('assignees').child(uid).set({
        email: email,
        uid: uid
      })
    } else if(!isInputChecked) {
      firebase.database().ref().child('states').child(state.stateId).child('assignees').child(uid).remove();
    }
  }

  render() {

    let states = [];
    let statesRef = firebase.database().ref().child('agents').child(this.props.user.uid).child('states');
    statesRef.on('value', snap => {
      for(let i in snap.val()) {
        let state = snap.val()[i]
        states.push(<Toggle 
                      key={i}
                      ref={i}
                      label={state.name} 
                      defaultToggled={state.state} 
                      onToggle={this.handleToggleChange.bind(this, state)}
                      />)
      }
    })

    return (
        <div>
          {states.length > 0 ? states : <LinearProgress />}
        </div>
    );
  }
}

export default UserStateList;
