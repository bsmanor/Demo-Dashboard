import React, { Component } from 'react';
import './addCallback.css';
// material-UI components
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
// Import firebase
import * as firebase from 'firebase';


export default class AddCallback extends Component {

  constructor() {
    super();
    this.state = {
      // states for adding callback to an agent
      agentDropDownValue: 0,
      datePicker: null,
      day: null,
      timePicker: null
    }
  }

  handleAgentDropDownValue = (event, index, value) => {
    this.setState({agentDropDownValue: value});
  }

  handleChangeDatePicker = (event, date) => {
    let newDate = date.toString();
    let day = newDate.slice(0, 3);
    newDate = newDate.slice(4, 15);
    this.setState({datePicker: newDate, day: day});
  }

  handleChangeTimePicker = (event, date) => {
    let time = date.toString();
    let timeLength = time.search(/\d\d:\d\d:\d\d/);
    time = time.slice(timeLength, timeLength + 5);
    this.setState({timePicker: time})
  }

  addCallback = () => {
    // get the assignee name from firebase and assign it to 'assignee'
    let assignee;
    let assigneeId;
    firebase.database().ref().child('agents').child(this.state.agentDropDownValue)
      .on('value', snap => {
        assignee = snap.val().firstName + ' ' + snap.val().lastName
        assigneeId = snap.val().uid
      })
    // creating the callback object
    let callback = {
      assignee: assignee,
      assigneeId: assigneeId,
      requestedBy: this.refs.requestedBy.input.value,
      date: this.state.datePicker,
      day: this.state.day,
      hour: this.state.timePicker,
      networkId: this.refs.networkId.input.value,
      url: this.refs.linkToTicket.input.value,
      status: 'pending'
    }
    // get the ID of the new added callback
    let callbackId = firebase.database().ref().child('callbacks').push().key;
    // pushing the new callback to firebase
    firebase.database().ref().child('callbacks').child(callbackId).set(callback)
    firebase.database().ref().child('agents').child(this.state.agentDropDownValue).child('callbacks').child(callbackId).set({
      id: callbackId,
      status: 'Waiting'
    });
    this.setState({
      datePicker: null,
      timePicker: null
    });
    this.refs.requestedBy.input.value = null;
    this.refs.networkId.input.value = null;
    this.refs.linkToTicket.input.value = null;
    this.openSnack('CALLBACK ADDED');
  }

  openSnack = (message) => {
    this.props.openSnack(message)
  }

  render() {

    const styles = {
      container: {
        margin: 10
      },
      cardHeader: {
        backgroundColor: this.props.styles.cardHeader
      },
      agentsDropDown: {
        display: 'inline',
        width: 200
      },
      agentsDropDownUnderlne: {
        padding: 0
      },
      picker: {
        marginTop: 14
      }
    }

    const agents = [];
    let agentsRef = firebase.database().ref().child('agents');
    agentsRef.on('value', snap => {
      for(let agent in snap.val()) {
        agents.push(<MenuItem value={agent} key={agent} primaryText={snap.val()[agent].firstName + ' ' + snap.val()[agent].lastName} />)
      }
    })

    return (
      <Card style={styles.container}>
        <CardHeader style={styles.cardHeader} title="ADD CALLBACK" />
        <CardText className="flexColumn">
          <DropDownMenu ref="agentsDropDown" 
            floatingLabelText="Select agent"
            style={styles.agentsDropDown}
            value={this.state.agentDropDownValue} 
            onChange={this.handleAgentDropDownValue}>
            <MenuItem value={0} key={0} primaryText={'Select...'} disabled={true} />
              {agents}
            </DropDownMenu>

          <DatePicker style={styles.picker} firstDayOfWeek={0} ref="datePicker" hintText="Date" onChange={this.handleChangeDatePicker} />
          <TimePicker style={styles.picker} format="24hr" hintText="Hour(UTC)" onChange={this.handleChangeTimePicker} />

          <TextField
            id="requestedBy"  type="text" ref="requestedBy" hintText="Requested By"
              floatingLabelStyle={this.props.styles.floatingLabelTextColor} floatingLabelText="Requested By" />

          <TextField
            id="networkId"  type="text" ref="networkId" hintText="Network ID" 
              floatingLabelStyle={this.props.styles.floatingLabelTextColor} floatingLabelText="Network ID" />

          <TextField
            id="linkToTicket"  type="text" ref="linkToTicket" hintText="Link To Ticket" 
              floatingLabelStyle={this.props.styles.floatingLabelTextColor} floatingLabelText="Link To Ticket" />
              
        </CardText>

        <CardActions>
          <RaisedButton
            label="ADD CALLBACK"
            secondary={true}
            disabled={false}
            onClick={this.addCallback}
          />
        </CardActions>
      </Card>
    );
  }
}
