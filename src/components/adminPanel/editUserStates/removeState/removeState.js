import React, { Component } from 'react';
// import Firebase
import * as firebase from 'firebase';
// importing material-ui components
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

export default class RemoveState extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // states dropdown
      statesDropDownValue: 0
    }
  }


  handleRemoveState() {
    let dbRef = firebase.database().ref();

    // Remove state from States node
    dbRef.child('states/' + this.state.statesDropDownValue).remove();
    // Remove state from each agent
    dbRef.child('agents').on('value', snap => {
      for(let i in snap.val()) {
        dbRef.child('agents').child(i).child('states/' + this.state.statesDropDownValue).remove();
      }
    })
    this.props.openSnack('STATE REMOVED');
    this.setState({statesDropDownValue: 0})
  };

  handleStatesDropDownValue  = (event, index, value) => this.setState({statesDropDownValue: value});

  render() {

    let dbRef = firebase.database().ref();
    const states = [];
    let statesRef = dbRef.child('states');
    statesRef.on('value', snap => {
      for(let state in snap.val()) {
        states.push(<MenuItem value={state} key={state} primaryText={snap.val()[state].name} />)
      }
    })

    return (
        <Card className="card">
          <CardHeader title={"REMOVE STATE"} />
          <CardText className="flexRowStart">
            <DropDownMenu ref="statesDropDown" value={this.state.statesDropDownValue} onChange={this.handleStatesDropDownValue}>
              <MenuItem value={0} key={0} primaryText={'Select...'} />
              {states}
            </DropDownMenu>
          </CardText>
          <CardActions>
            <RaisedButton
              label="REMOVE STATE"
              secondary={true}
              disabled={false}
              onClick={this.handleRemoveState.bind(this)}
            />
          </CardActions>
        </Card>
    );
  }
}
