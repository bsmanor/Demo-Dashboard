import React, { Component } from 'react';
import UserStateList from './userStateList';

// importing material-ui components
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './user-panel.css';

class UserPanel extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {

    const styles = {
      statesContainer: {
        width: "auto",
        height: "auto",
        marginRight: 30
        //backgroundColor: this.props.styles.userBar
      }
    }

    return (

        <Card style={styles.statesContainer}>
          <CardHeader
            className="cardHeader"
            title={"STATE"} />
          <CardText>
            <UserStateList user={this.props.user}/>
          </CardText>
        </Card>
    );
  }
}

export default UserPanel;
