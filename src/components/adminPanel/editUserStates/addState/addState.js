import React, { Component } from 'react';
// import Firebase
import * as firebase from 'firebase';
// importing material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

export default class AddNewState extends Component {

  constructor() {
    super();
    this.state = {
      viewOnTasksCheckbox: false
    }
  }


  addState(){
    let name = this.refs.stateName.input.value;
    //let icon = this.refs.icon.input.value;
    // function that turns strings to camelCase strings, for creating keys for state names.
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    }
    let key = camelize(name);
    // creating database ref
    let dbRef = firebase.database().ref();
    // generating entry ID from firebase. New state will be pushed into this key
    let fbKey = dbRef.child('states').push().key;
    dbRef.child('states').child(fbKey).set({
      key: key,
      name: name,
      viewOnTasks: this.state.viewOnTasksCheckbox,
      //icon: icon
    })
    // Going through all agents and adding the new generated state for each one
    let agentsRef = dbRef.child('agents')
    agentsRef.on('value', snap => {
      for(let i in snap.val()) {
        agentsRef.child(i).child('states').child(fbKey).set({
          key: key,
          name: name,
          state: false,
          viewOnTasks: this.state.viewOnTasksCheckbox
        })
      }
    })

    this.refs.stateName.input.value = null;
    this.setState({viewOnTasksCheckbox: false});
    this.props.openSnack('STATE ADDED');
  }

  handleCheckboxState = (event, isInputChecked) => {
    this.setState({
      viewOnTasksCheckbox: isInputChecked
    })
  }

  render() {

    const textUnderLine = {
      width: 150
    }

    return (
      <Card className="card">
          <CardHeader title={"Add New State"} />
          <CardText className="flexColumn">
            <TextField
              underlineStyle={textUnderLine}
              type="text" ref="stateName" hintText="State Name" floatingLabelText="State Name"
            />
            {/* <TextField
              underlineStyle={textUnderLine}
              type="text" ref="icon" hintText="Material-Icon Name" floatingLabelText="Material-Icon"
            />
            Select an icon name from <a href="https://material.io/icons/" target="_blank">here</a>
            <br /> */}
            <Checkbox
              checked={this.state.viewOnTasksCheckbox}
              label="Show in Tasks"
              ref="viewOnTasksCheckbox"
              onCheck={this.handleCheckboxState.bind(this)}
            />
          </CardText>

          <CardActions>
            <RaisedButton
              label="ADD NEW STATE"
              secondary={true}
              disabled={false}
              onClick={this.addState.bind(this)}
            />
          </CardActions>
        </Card>
    );
  }
}
