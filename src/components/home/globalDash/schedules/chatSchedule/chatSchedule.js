import React, { Component } from 'react';
import EditChat from '../../../../adminPanel/editChatSchedule/editChat';
import { Link } from 'react-router-dom';
// import Firebase
import * as firebase from 'firebase';
// Importing Moment.js
import moment from 'moment';
// Material UI components
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class ChatSchedule extends Component {

  constructor() {
    super();
    this.state = {
      // table related states
      table: {},
      dayOfYear: moment().format('DDD'),
      weekOfYear: moment().format('W'),
      year: moment().format('YYYY'),
      // Dialog related states
      editChatDialogState: false
    }
  }
  // Function for automatically duplicating chat schedualls
  // duplicator = () => {
  //   let rowData;
  //   let rowDataRef = firebase.database().ref().child('chats').child(this.state.year).child(this.state.weekOfYear).child(this.state.dayOfYear).child('rowData');
  //   rowDataRef.on('value', snap => {
  //     rowData = snap.val()
  //   })
  //   for(let i = 1; i<365; i++) {
  //     let dayOfYear = moment().add(i, 'days').format('DDD');
  //     let weekOfYear = moment().add(i, 'days').format('W');
  //     let year = moment().add(i, 'days').format('YYYY');
  //     let date = moment().add(i, 'days').format('LL');
  //     let table = {
  //       dayOfYear: dayOfYear,
  //       weekOfYear: weekOfYear,
  //       year: year,
  //       date: date,
  //       rowData: rowData
  //     }
  //     firebase.database().ref().child('chats').child(year).child(weekOfYear).child(dayOfYear).set(table);
  //     console.log('====================================');
  //     console.log('Chat Added');
  //     console.log('====================================');
  //   }
  // };

  // ----------------------  functions for handleing the edit dialog status  ------------------------ //
  // functions for handleing the Add and Remove dialogs status
  handleEditDialogOpen = () => {
    this.setState({editChatDialogState: true});
  };
  handleEditDialogClose = () => {
    this.setState({editChatDialogState: false});
  };
  // ----------------------  end  ------------------------ //

  render() {

    const styles = {
      mainContainer: {
        height: '100%'
      },
      cardContainer: {
        //backgroundColor: this.props.styles.primary3,
        width: "auto",
        height: "100%"
      },
      tableContainer: {
        height: this.props.schedulesInnerBodyHeight
      },
      table: {
        width: '100%',
        fontSize: '115%'
      } ,     
      tableRowHeaders: {
        color: this.props.styles.success
      },
      createButton: {
        zDepth: 3      
      }
    }

    let table = [];
    let tableRef = firebase.database().ref().child('chats').child(this.state.year).child(this.state.weekOfYear).child(this.state.dayOfYear).child('rowData');
    tableRef.on('value', snap => {
      for(let i in snap.val()) {
        let rowData = snap.val()[i]
        table.push(
          <TableRow key={i}>
            <TableRowColumn>{moment(rowData.start).format('HH')}:{moment(rowData.start).format('mm')}</TableRowColumn>
            <TableRowColumn>{moment(rowData.end).format('HH')}:{moment(rowData.end).format('mm')}</TableRowColumn>
            <TableRowColumn>{rowData.primary}</TableRowColumn>
            {/* <TableRowColumn>{rowData.backup}</TableRowColumn> */}
          </TableRow>
        )
      }
    })

    return (
      <div style={styles.mainContainer}>
        <Card style={styles.cardContainer}>
        {this.props.mq ? <CardHeader title="CHAT SCHEDULE" titleStyle={this.props.styles.cardHeaderTitle} className="cardHeader" /> : null}
          <CardText>
            <div style={styles.tableContainer}>
              <Table selectable={false} style={styles.table}>

                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow style={styles.tableRowHeaders} selectable={false}>
                    <TableHeaderColumn><b>Start</b></TableHeaderColumn>
                    <TableHeaderColumn><b>End</b></TableHeaderColumn>
                    <TableHeaderColumn><b>Primary</b></TableHeaderColumn>
                    {/* <TableHeaderColumn><b>Backup</b></TableHeaderColumn> */}
                  </TableRow>
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                  {table}
                </TableBody>

              </Table>
            </div>
            <Link to={'/admin/chat'}><FloatingActionButton style={styles.createButton} mini={true}>
              <ContentCreate />
              {/* <ContentCreate onClick={this.handleEditDialogOpen} /> */}
            </FloatingActionButton></Link>
            {/* <FloatingActionButton style={styles.createButton} mini={true}>
              <ContentAdd onClick={this.duplicator} />
            </FloatingActionButton> */}
          </CardText>
        </Card>

        {/* Dialog for adding new message */}
        <Dialog
          autoScrollBodyContent={true}
          actions={[
            <RaisedButton primary={true} style={styles.buttonMargin} onClick={this.handleEditDialogClose} label="CANCEL" />,
          ]}
          open={this.state.editChatDialogState}
          onRequestClose={this.handleEditDialogOpen}
        >
          <EditChat styles={this.props.styles} openSnack={this.props.openSnack} styles={this.props.styles} user={this.props.user}/>
        </Dialog>
      </div>
    );
  }
}

export default ChatSchedule;
