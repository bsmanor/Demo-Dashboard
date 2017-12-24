import React, { Component } from 'react';
import * as firebase from 'firebase';
// Material UI components
import {Card, CardHeader, CardText} from 'material-ui/Card';
// Importing Moment.js
import moment from 'moment';

export default class WeeklyChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekOfYear: moment().format('W'),
      year: moment().format('YYYY')
    }
  }

  render() {

    let styles = {
      tableCard: {
        margin: '0px 20px'
        // width: 200,
        // height: 200
      },
      tableCardText: {
        textAlign: 'center'
      }
    }

    let weeklyChat = [];
    let weeklyChatRef = firebase.database().ref().child('chats').child(this.state.year).child(this.state.weekOfYear);
    weeklyChatRef.on('value', snap => {
      for(let i in snap.val()) {
        let day = snap.val()[i]
        let date = moment(day.date).format('MMM') + ' ' + moment(day.date).format('D')
        let tableRows = []
        //console.log(day);

        // get the rows data of each day of the week
        for(let x in day.rowData) {
          let row = day.rowData[x]
          tableRows.push(
            <tr key={x}>
              <td>{moment(row.start).format('HH')}:{moment(row.start).format('mm')}</td>
              <td>{moment(row.end).format('HH')}:{moment(row.end).format('mm')}</td>
              <td>{row.primary}</td>
            </tr>
          )
        }

        weeklyChat.push(
          <Card key={i} style={styles.tableCard}>
            <CardHeader title={day.day} subtitle={date} />
            <CardText style={styles.tableCardText}>
              <table>
                <tr>
                  <th>Start</th>
                  <th>End</th>
                  <th>Primary</th>
                </tr>
                {tableRows}
              </table>
            </CardText>
          </Card>
        )
      }
    })

    return (
      <div className="flexRowCenter">
        {weeklyChat}
      </div>
    );
  }
}
