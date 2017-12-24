import React, { Component } from 'react';
import './home.css';
// import Firebase
import * as firebase from 'firebase';
// import components
import TeamPanel from './globalDash/teamPanel';
import Tasks from './tasks/tasks';
import Callbacks from './callbacks/callbacks';
// importing material-ui components

class Home extends Component {

  constructor() {
    super();
    this.state = {
      agents: [],
      agent: {}
    }
  }

  componentWillMount = () => {
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
      tasks: {
        marginBottom: 15
      },
      chatsAndTasks: {
        marginBottom: 15
      },
      chats: {
        flex: 3,
        marginRight: 15
      },
      callbacks: {
        flex: 2
      }
    }

    return (
      <div className="homeContainer">
        <div style={styles.tasks}>
          <Tasks user={this.props.user}
            agent={this.state.agent} 
            agents={this.state.agents}
            styles={this.props.styles} 
          />
          <div style={styles.callbacks}>
            <Callbacks user={this.props.user} 
              agent={this.state.agent} 
              agents={this.state.agents} 
              styles={this.props.styles} 
            />
          </div>
        </div>
        <div style={styles.teamPanel}>
          <TeamPanel user={this.props.user} 
            agent={this.state.agent} 
            agents={this.state.agents} 
            styles={this.props.styles} 
          />
        </div>
      </div>
    );
  }
}

export default Home;
