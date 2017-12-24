import React, { Component } from 'react';

// import components
import UserPanel from '../components/home/user-panel/user-panel';
import TeamPanel from '../components/home/team-panel/team-panel';
import Tasks from '../components/home/tasks/tasks';
import Callbacks from '../components/home/callbacks/callbacks';
import Chats from '../components/home/chats/chats';
// importing material-ui components
import {Tabs, Tab} from 'material-ui/Tabs';

class MobileView extends Component {

  constructor() {
    super();
    this.state = {
      tab: 'a'
    }
  }

  handleChange = (value) => {
    this.setState({
      tab: value
    });
  };

  render() {

    return (
        <div className="App">
          <Tabs>
            <Tab label="PROFILE" value="a">
              <UserPanel email={this.state.email} mq={this.props.mq.matches} userName={this.state.userName} styles={this.state.styles} />
            </Tab>
            <Tab label="TASKS" value="b">
              <Tasks styles={this.state.styles} />
            </Tab>
            <Tab label="TEAM" value="c">
              <TeamPanel styles={this.state.styles} />
            </Tab>
            <Tab label="CHATS" value="d">
              <Chats styles={this.state.styles} mq={this.props.mq.matches} />
            </Tab>
            <Tab label="CALLBACKS" value="e">
              <Callbacks styles={this.state.styles} />
            </Tab>
          </Tabs>
        </div>
    );
  }
}

export default MobileView;