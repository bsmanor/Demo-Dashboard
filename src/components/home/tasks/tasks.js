import React, { Component } from 'react';
import Assignees from './assignees';
import * as firebase from 'firebase';
import './tasks.css';
// import material-ui components
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      states: [],
      isBorderRed: null,
      newTickets: ''
    }
  }

  getNewTickets = () => {
    fetch('http://192.168.162.143/?api=zendesk_new_tickets', {method: 'get'})
    .then((res) => res.json())
    .then((data) => {
      if(this.refs.taskCard) {this.setState({newTickets: data})}
    })
  }

  componentDidMount() {
    this.getNewTickets();
    let newTickets = setInterval(this.getNewTickets, 20000);
  }

  render() {

    const styles = {
      tasksContainer: {
        height: '100%',
        width: '100%'
      },
      card: {
        margin: 10,
        width: 250,
        border: this.state.isBorderRed
      },
      tasksCardHeader: {
        //backgroundColor: this.props.styles.primary2
        borderBottom: 'solid 2px' + this.props.styles.primary3
      },
      fontIcon: {
        color: this.props.styles.accent3
      }
    }


    let tasks = [];
    const statesRef = firebase.database().ref().child('states');
    statesRef.on('value', snap => {
      for(let i in snap.val()) {
        let task = snap.val()[i]
        if(task.viewOnTasks) {
          if(task.key === "assignedTickets") {
            tasks.push(
              <Card ref="taskCard" key={i} style={styles.card}>
                <CardHeader style={styles.tasksCardHeader} title={task.name} />
                <CardText style={styles.cardText}>
                  <Assignees styles={this.props.styles} taskName={task.key} task={i}/>
                </CardText>
              </Card>
            )
          } else {
            tasks.push(
              <Card key={i} style={styles.card}>
                <CardHeader style={styles.tasksCardHeader} title={task.name} />
                <CardText style={styles.cardText}>
                  <Assignees styles={this.props.styles} taskName={task.key} task={i}/>
                </CardText>
              </Card>
            )
          }
        }
      }
    })

    return (
      <Card style={styles.tasksContainer}>
        <CardHeader className="cardHeader" title="TASKS" />
        <CardText className="flexRowStart">
          {tasks}
        </CardText>
      </Card>
    );
  }
}

export default Tasks;
