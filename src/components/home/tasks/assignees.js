import React, { Component } from 'react';
import * as firebase from 'firebase';
import './tasks.css';
// import material-ui components
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

export default class Assignees extends Component {

  render() {

    let styles = {
      badge: {

      },
      noAgents: {
        color: this.props.styles.primary3
      }
    }

    let assignees = [];
    const assigneesRef = firebase.database().ref().child('states').child(this.props.task).child('assignees');
    assigneesRef.on('value', snap => {
      let agent = snap.val()
      for(let i in agent) {
        let user
        firebase.database().ref().child('agents').child(i).on('value', snap2 => {
          user = snap2.val().firstName + ' ' + snap2.val().lastName
        })
        if(this.props.taskName === "assignedTickets") {
          assignees.push(<Chip className="chip" key={i}><Avatar size={10}>1</Avatar>{user}</Chip>)
        } else {
          assignees.push(<Chip className="chip" key={i}>{user}</Chip>)
        }
      }
      if(assignees.length === 0) {
        assignees.push(<span key="noAgents" style={styles.noAgents}>NA<br/>On Production</span>)
      }
    })

    return (
      <div className="chipContainer">
        {assignees}
      </div>
    );
  }
}
