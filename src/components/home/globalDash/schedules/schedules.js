import React, { Component } from 'react';
import TeamCallbacks from './team-callbacks/teamCallbacks';
import ChatSchedule from './chatSchedule/chatSchedule';
import Messages from './messages/messages';
// Material-UI imports
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Schedules extends Component {

  constructor() {
    super();
    this.state = {
      // sub-components inner-cardText height
      schedulesInnerBodyHeight: '19em'
    }
  }

  render() {

    let styles = {
      messagesContainer: {
        flex: 1,
        marginRight: 10
      },
      chatsContainer: {
        flex: 1,
        marginRight: 10
      },
      callbackContainer: {
        flex: 1
      }
    }

    let page = []
    if(this.props.mq) {
      page.push( 
      <div key="desktop" style={styles.mainContainer} className="flexRow">   
        <div style={styles.messagesContainer}>
          <Messages
            mq={this.props.mq}
            schedulesInnerBodyHeight={this.state.schedulesInnerBodyHeight}
            styles={this.props.styles} 
            agent={this.props.agent} 
            agents={this.props.agents} 
            user={this.props.user}
            openSnack={this.props.openSnack} 
            />
        </div>
        <div style={styles.chatsContainer}>
          <ChatSchedule 
            mq={this.props.mq}
            schedulesInnerBodyHeight={this.state.schedulesInnerBodyHeight}
            styles={this.props.styles}
            agent={this.props.agent} 
            agents={this.props.agents} 
            user={this.props.user}
            openSnack={this.props.openSnack} 
            />
        </div>
        <div style={styles.callbackContainer}>
          <TeamCallbacks 
            mq={this.props.mq}
            schedulesInnerBodyHeight={this.state.schedulesInnerBodyHeight}
            styles={this.props.styles} 
            agent={this.props.agent} 
            agents={this.props.agents}
            user={this.props.user}
            openSnack={this.props.openSnack} 
          />
        </div>
    
      </div>
      )
    } else {
      page.push( 
      <Tabs key="mobile">
        <Tab
          label="MESSAGES"
        >
          <Messages 
            styles={this.props.styles} 
            agent={this.props.agent} 
            agents={this.props.agents} 
            user={this.props.user}
            openSnack={this.props.openSnack}
            mq={this.props.mq} 
          />
        </Tab>

        <Tab
          label="CHAT"
        >
          <ChatSchedule 
            styles={this.props.styles}
            agent={this.props.agent} 
            agents={this.props.agents} 
            user={this.props.user}
            openSnack={this.props.openSnack} 
            mq={this.props.mq}
          />
        </Tab>

        <Tab
          label="CALLBACKS"
        >
          <TeamCallbacks 
            styles={this.props.styles} 
            agent={this.props.agent} 
            agents={this.props.agents}
            user={this.props.user}
            openSnack={this.props.openSnack} 
            mq={this.props.mq}
          />
        </Tab>
      </Tabs>
      )
    }

    return (
      // Component should contain 3 sub-components: Chat component, chat and callback schedule, agents status.
      // Chat and Schedule components are created as sub-components in this folder. Agents status will be imported from from home/team-panel
        <div>
        {page}
        </div>
    );
  }
}
