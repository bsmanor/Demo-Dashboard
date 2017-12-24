import React, { Component } from 'react';
import * as firebase from 'firebase';
// Material UI components
import {Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

class TeamPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamNames: [],
      teamOpens: ''
    }
  }

  render() {

    const styles = {
      agentCard: {
        flex: 1,
        maxWidth: '33.333%',
        height: 'auto',
        marginBottom: 5
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginRight: 15
      },
      activeAgentStyle: {
        //fontSize: '80%',
        color: this.props.styles.success
      },
      inactiveAgent: {
        //fontSize: '80%',
        color: this.props.styles.subTextColor
      },
      mailIcon: {
        marginRight: 5,
        marginTop: 10
      },
      openTicketsCounter: {
        position: 'relative',
        bottom: 7
      }
    }

    const team = [];
    let agentsRef = firebase.database().ref().child('agents');
    agentsRef.on('value', snap => {
      for(let i in snap.val()) {
        let agent = snap.val()[i]
        let openTickets = agent.openTickets
        // Two agents status options. If status = active => text color is Success color.
        let activeAgent = <div style={styles.activeAgentStyle}>{agent.currentState}</div>
        let inactiveAgent = <div style={styles.inactiveAgent}>{agent.currentState}</div>
        team.push(
          <Card ref="agentCard" key={i} style={styles.agentCard}>
            <CardText >
              <div className="flexRowStart">
                <img src={agent.avatarUrl} style={this.props.styles.avatarSize} />
                <span>
                  {this.props.mq ? agent.firstName : null}
                  {agent.currentState === 'Active' ? activeAgent : inactiveAgent}
                </span>
              </div>
              {this.props.mq 
                ? 'Tickets: ' 
                : <FontIcon className="material-icons" style={styles.mailIcon}>mail</FontIcon>
              } 
              {openTickets 
                ? this.props.mq ? openTickets : <span style={styles.openTicketsCounter}>{openTickets}</span>  
                : this.props.mq ? ' 0' : <span style={styles.openTicketsCounter}>0</span>
              }
              
            </CardText>
          </Card>
        )
      }
    })

    return (
      <div className="flexRowStart">
        {team}
      </div>
    );
  }
}

export default TeamPanel;
