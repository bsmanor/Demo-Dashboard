import React, { Component } from 'react';
import './editUserStates.css';
import EditAgent from './editAgent/editAgent'
// components
import AddNewAgent from './addNewAgent/addNewAgent';
import RemoveAgent from './removeAgent/removeAgent';
import AddNewState from './addState/addState';
import RemoveState from './removeState/removeState';

class EditUserStates extends Component {

  constructor(){
    super();
    this.state = {
      value: 0
    }
  }

  render() {

    let styles = {
      flex: {
        flex: 1
      }
    }

    return (
      <div>
        <div className="flexColumn">
            <AddNewAgent style={styles.flex} openSnack={this.props.openSnack} />
            <EditAgent style={styles.flex} openSnack={this.props.openSnack} />
            <RemoveAgent style={styles.flex} openSnack={this.props.openSnack} agents={this.props.agents} />
            <AddNewState style={styles.flex} openSnack={this.props.openSnack} />
            <RemoveState style={styles.flex} openSnack={this.props.openSnack} />
          </div>
      </div>
    );
  }
}



export default EditUserStates;
