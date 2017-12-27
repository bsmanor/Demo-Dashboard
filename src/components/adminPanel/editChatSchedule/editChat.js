import React, { Component } from 'react';
import './editChat.css';
// import Firebase
import * as firebase from 'firebase';
// React Moment
import Moment from 'react-moment';
// Importing Moment.js
import moment from 'moment';
// importing material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText, CardActions} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class EditChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // table states
      primary: 'Primary',
      backup: 'Backup',
      start: 'Start',
      end: 'End',
      table: [],
      addedDays: 0
    }
  }


  addRow = () => {

    let primary = this.state.primary;
    let backup = this.state.backup;
    let start = this.state.start;
    let end = this.state.end;
    let rowData = {
      primary: primary,
      backup: backup,
      start: start,
      end: end
    };
    //let tmpTable = this.state.table;
    //tmpTable.push(rowData);
    this.setState({
      table: this.state.table.concat(rowData),
      start: end
    });
    this.refs.start = this.refs.end;
  }
  // Option to edit existiong fileds and rows
  editRow = (i) => {
    console.log(this.refs.week.state.content);
  }

  deleteRow = (i) => {
    let table = this.state.table;
    delete table[i]
    this.setState({table: table})
  }

  saveTable = () => {
    let year = this.refs.year.state.content;
    let weekOfYear = this.refs.week.state.content;
    let dayOfYear = this.refs.dayOfYear.state.content;
    let date = this.refs.date.state.content;
    let day = this.refs.day.state.content;
    let table = {
      dayOfYear: dayOfYear,
      weekOfYear: weekOfYear,
      date: date,
      day: day,
      rowData: this.state.table
    };
    firebase.database().ref().child('chats').child(year).child(weekOfYear).child(dayOfYear).set(table);
    this.openSnack('CHAT SCHEDULE SAVED');
  }

  nextDay = (next) => {
    let x = this.state.addedDays + 1;
    this.setState({addedDays: x})
  }
  prevDay = (next) => {
    let x = this.state.addedDays - 1;
    this.setState({addedDays: x})
  }



  handlePrimaryDropdown = (event, index, value) => {this.setState({primary: value})};
  handleBackupDropdown = (event, index, value) => {this.setState({backup: value})};
  handleStartOnChange = (event, date) => {
    this.setState({start: date.toString()})
  };
  handleEndOnChange = (event, date) => {
    this.setState({end: date.toString()})
  };

  openSnack = (message) => {
    this.props.openSnack(message)
  }


  render() {

    const styles = {
      mainContainer: {
        //backgroundColor: this.props.styles.accent2,
        margin: '0px 20%'
      },
      card: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 50,
        padding: 10
      },
      mainTable: {
        width: 'auto'
      },
      textareaStyle: {
        width: 100
      },
      dropDownMenu: {
        //marginRight: 15,
        padding: 0
      },
      timePicker: {
        marginLeft: 24,
        label: {
          color: this.props.styles.textColor
        }
      },
      addRowButton: {
        display: 'inline'
      },
      underlineStyle: {
        width: 100
      }
    };

   // table of the already added rows. Will appear at the bottom of the page
    let tableRows = [];
    for(let i in this.state.table) {
      let row = this.state.table[i]
      tableRows.push(
        <TableRow key={i}>
          <TableRowColumn>{moment(row.start).format('HH')}:{moment(row.start).format('mm')}</TableRowColumn>
          <TableRowColumn>{moment(row.end).format('HH')}:{moment(row.end).format('mm')}</TableRowColumn>
          <TableRowColumn>{row.primary}</TableRowColumn>
          <TableRowColumn>{row.backup}</TableRowColumn>
          <TableRowColumn>
            <FlatButton icon={<FontIcon className="material-icons" color={this.props.styles.danger}>delete</FontIcon>} onClick={() => this.deleteRow(i)} />
          </TableRowColumn>
        </TableRow>
      )
    }

    const agents = [];
    let agentsRef = firebase.database().ref().child('agents');
    agentsRef.on('value', snap => {
      for(let i in snap.val()) {
        let agent =  snap.val()[i]
        agents.push(
          <MenuItem
            key={i}
            value={agent.firstName}
            primaryText={agent.firstName}
          />
        )
      }
    })


    return (
      // paper where the date choosen will be shown
      <div style={styles.mainContainer} className="flexColumn content">
        <div className="flexColumn">
          <Paper className="datePaper" zDepth={2}>
            <h1 className="day"><Moment ref="day" format="dddd" add={{days: this.state.addedDays}}></Moment></h1>
            <h3 className="date"><Moment ref="date" format="ll" add={{days: this.state.addedDays}}></Moment></h3>
            <h4 className="day">Week: <Moment ref="week" format="w" add={{days: this.state.addedDays}}></Moment></h4>
            <span className="hide">Week: <Moment ref="dayOfYear" format="DDD" add={{days: this.state.addedDays}}></Moment></span>
            <span className="hide"><Moment ref="year" format="YYYY" add={{days: this.state.addedDays}}></Moment></span>
          </Paper>

          {/* Arrows for navigating between dates */}
          <div className="flexRowCenter">
            <RaisedButton secondary={true} icon={<FontIcon onClick={this.prevDay} className="material-icons">chevron_left</FontIcon>} onClick={this.prevDay} />
            <RaisedButton secondary={true} icon={<FontIcon onClick={this.nextDay} className="material-icons">chevron_right</FontIcon>} onClick={this.nextDay}/>
          </div>

        </div>

        {/* New row form. Contains two Agents dropdowns and two time pickers and a sava button */}
        <Card className="card autoWidth">
          <CardText className="flexColumn">
            <DropDownMenu
              ref="primary"
              underlineStyle={styles.dropDownMenu}
              value={this.state.primary}
              onChange={this.handlePrimaryDropdown}>
              <MenuItem value={this.state.primary} primaryText="Primary" disabled={true} />
              {agents}
            </DropDownMenu>

            <DropDownMenu
              ref="backup"
              style={styles.dropDownMenu}
              value={this.state.backup}
              onChange={this.handleBackupDropdown}>
              <MenuItem value={this.state.backup} primaryText="Backup" disabled={true} />
              <MenuItem value="- -" primaryText="- -" />

              {agents}
            </DropDownMenu>

            <TimePicker style={styles.timePicker} format="24hr" ref="start" hintText="Start" minutesStep={5} onChange={this.handleStartOnChange} />
            <TimePicker style={styles.timePicker} textFieldStyle={styles.timePicker.label} format="24hr" ref="end" hintText="End" minutesStep={5} onChange={this.handleEndOnChange} />
            <span><RaisedButton
              style={styles.timePicker}
              secondary={true}
              label="ADD"
              onClick={this.addRow}
            /></span>
          </CardText>
        </Card>


        {/* Table where all added rows will appear */}
        <Card className="card autoWidth">
          <CardText>
            <Table style={styles.mainTable}>

              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Start</TableHeaderColumn>
                  <TableHeaderColumn>End</TableHeaderColumn>
                  <TableHeaderColumn>Primary</TableHeaderColumn>
                  <TableHeaderColumn>Backup</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                {tableRows}
              </TableBody>

            </Table>
          </CardText>

          <CardActions>
            <RaisedButton secondary={true} label="SAVE" onClick={ () => this.saveTable(false)}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}
