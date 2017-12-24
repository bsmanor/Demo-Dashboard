import React, { Component } from 'react';
import './globalDash.css';
import NavBar from '../../navBar/navBar';
import TeamPanel from './teamPanel';
import Chat from './chat/chat';
import Schedules from './schedules/schedules';
// import Firebase
import * as firebase from 'firebase';
// Import Material UI components
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

export default class GlobalDash extends Component {

  constructor() {
    super();
    this.state = {
      agent: {},
      agents: [],
      selectedIndex: 1
    }
  }

  select = (index) => this.setState({selectedIndex: index});  

  // checkMediaQuery = () => {
  //   let mq = matchMedia( "(min-width: 750px)" )
  //   if(mq.matches === true) {
  //     this.setState({mq: true})
  //   } else {
  //     this.setState({mq: false})
  //   }
  // }

  componentDidMount = () => {
    let agentsRef = firebase.database().ref().child('agents');
    agentsRef.on('value', snap => {
      this.setState({agents: snap.val()})
    })

    let agentRef = firebase.database().ref().child('agents').child(this.props.user.uid);
    agentRef.on('value', snap => {
      this.setState({agent: snap.val()})
    })
  }

  render() {

    let styles = {
      gDashContainer: {
        height: '100%'
      },
      bottom: {
        margin: '10px 15px',
        flex: 1
      }
    }

    return (
      // Component should contain 3 sub-components: Chat component, chat and callback schedule, agents status.
      // Chat and Schedule components are created as sub-components in this folder. Agents status will be imported from from home/team-panel
      <div style={styles.gDashContainer} className="flexColumn">
        <div style={styles.bottom}>
          <Chat 
            styles={this.props.styles}
            agent={this.state.agent} 
            agents={this.state.agents} 
            user={this.props.user} 
            mq={this.props.mq}
          />
        </div>
        <div style={styles.bottom}>
          <Schedules 
            styles={this.props.styles} 
            agent={this.state.agent} 
            agents={this.state.agents}
            user={this.props.user}
            openSnack={this.props.openSnack} 
            mq={this.props.mq}
          />
        </div>
        <div style={styles.bottom}>
          <TeamPanel
            agent={this.state.agent} 
            agents={this.state.agents} 
            styles={this.props.styles} 
            user={this.props.user}
            mq={this.props.mq} 
          />
        </div>
        {/* <div style={styles.bottom}>
          <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="GitHub"
              icon={<FontIcon className="material-icons">restore</FontIcon>}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="About"
              icon={<FontIcon className="material-icons">restore</FontIcon>}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="This Site"
              icon={<FontIcon className="material-icons">restore</FontIcon>}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        </div> */}
      </div>
    );
  }
}
