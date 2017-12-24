import React, { Component } from 'react';
import './callbacks.css';
// import Firebase
import * as firebase from 'firebase';
// Materiual UI components
import {Card, CardText, CardHeader} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

class Callbacks extends Component {

  deleteCallback = (i) => {
    // remove callback from global callbacks node
    firebase.database().ref().child('callbacks').child(i).remove();
    // remove callback from agent's callback node
    firebase.database().ref().child('agents').child(this.props.user.uid).child('callbacks').child(i).remove();

  }


  render() {

    const styles = {
      cardContainer: {
        width: "auto",
        height: 'auto'
      },
      callbackCard: {
        width: 200
      },
      deleteIcon: {
        color: this.props.styles.danger,
        float: 'right',
        cursor: 'pointer'
      }
    }

    let callbacks = [];
    // create a reference to agent's callbacks list
    let agentCallbacksRef = firebase.database().ref().child('agents').child(this.props.user.uid).child('callbacks');
    agentCallbacksRef.on('value', snap => {
      if(snap.val() === null) {
        callbacks.push(
          <h3 key="noCallbacks" style={{textAlign:'center', color: this.props.styles.accent3}}>There are no upcoming callbacks</h3>
        )
      } else {
        // loop through each callback ID
        for(let i in snap.val()) {
          let callbackId = i
          // create a reference to the callback itself under the Callbacks node
          let callbackRef = firebase.database().ref().child('callbacks').child(callbackId)
          callbackRef.on('value', snap2 => {
            let callback = snap2.val()
            if(callback != null) {
              callbacks.push(
                <Card key={i} style={styles.callbackCard}>
                  <CardHeader title={callback.networkId} subtitle={callback.requestedBy} />
                  <CardText>
                    {callback.day + ', ' + callback.date + ', ' + callback.hour}<br />
                    <a className="link" href={callback.url} target="_blank" rel="noopener noreferrer">Go To Ticket</a><br/><br/>
                    {/* <FontIcon className="material-icons">done</FontIcon> */}
                    <FontIcon style={styles.deleteIcon} className="material-icons" color={this.props.styles.danger} onClick={() => this.deleteCallback(i)}>delete</FontIcon><br/>
                  </CardText>
                </Card>
              )
            } else {
              callbacks.push(
                <h3 key="noCallbacks" style={{textAlign:'center', color: this.props.styles.accent3}}>There are no upcoming callbacks</h3>
              )
            }
          })
        }
      }
    })

    return (
      <Card style={styles.cardContainer}>
        <CardHeader className="cardHeader" title="UPCOMING CALLBACKS" />
        <CardText>
            {callbacks}
        </CardText>
      </Card>
    );
  }
}

export default Callbacks;
