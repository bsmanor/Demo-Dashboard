import React, {Component} from 'react';
import * as firebase from 'firebase';
// Material UI components
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class EditAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // states for Remove Agent dropt down
      agentDropDownValue: 0
    }
  }

  handleRemoveAgentDropDownValue = (event, index, value) => this.setState({agentDropDownValue: value});

  render() {

    let dbRef = firebase.database().ref();

    let agents = [];
    dbRef.child('agents').on('value', snap => {
      for(let i in snap.val()) {
        let agent = snap.val()[i]
        agents.push(
          <MenuItem value={agent} key={i} primaryText={agent.firstName + ' ' + agent.lastName} />
        )
      }
    })

    return (
      <Card className="card">
        <CardHeader title="Edit User Details" />
        <CardText>
          <DropDownMenu ref="agentsDropDown" value={this.state.agentDropDownValue} onChange={this.handleRemoveAgentDropDownValue}>
            <MenuItem value={0} key={0} primaryText={'Select...'} />
            {agents}
          </DropDownMenu>
        </CardText>
      </Card>
    );
  }
}
