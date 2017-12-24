import React, { Component } from 'react';
import * as firebase from 'firebase';
// importing material-ui components
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

export default class RemoveAgent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // states for Remove Agent dropt down
      agentDropDownValue: 0
    }
  }

  removeAgent() {
    let agent = this.state.agentDropDownValue;
    // // remove agent from 'agents' node
    firebase.database().ref().child('agents').child(agent).remove();
    this.props.openSnack('AGENT REMOVED');
  }

  handleRemoveAgentDropDownValue = (event, index, value) => this.setState({agentDropDownValue: value});


  render() {

    const agents = [];
    let agentsRef = firebase.database().ref().child('agents');
    agentsRef.on('value', snap => {
      for(let agent in snap.val()) {
        agents.push(<MenuItem value={agent} key={agent} primaryText={snap.val()[agent].firstName + ' ' + snap.val()[agent].lastName} />)
      }
    })

    return (
      <Card className="card">
          <CardHeader title={"REMOVE AGENT"} />
          <CardText className="flexRowStart">
            <DropDownMenu ref="agentsDropDown" value={this.state.agentDropDownValue} onChange={this.handleRemoveAgentDropDownValue}>
              <MenuItem value={0} key={0} primaryText={'Select...'} />
              {agents}
            </DropDownMenu>
          </CardText>
          <CardActions>
            <RaisedButton
              label="REMOVE AGENT"
              secondary={true}
              disabled={false}
              onClick={this.removeAgent.bind(this)}
            />
          </CardActions>
        </Card>
    );
  }
}
