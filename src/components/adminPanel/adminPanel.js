import React, { Component } from 'react';
import './adminPanel.css';
import { Link } from 'react-router-dom';
// importing material-ui components
import FontIcon from 'material-ui/FontIcon';
import {Card, CardText, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    let styles = {
      adminContainer: {
        margin: 'auto'
      },
      cardTitle: {
        borderBottom: 'solid 2px' + this.props.styles.accent3
      },
      titleIcon: {
        marginRight: 8
      }
    }

    let adminCards = []
    let cards = {
      users: {
        title: 'Users',
        subtitle: 'Manage users and states',
        image: 'group',
        link: '/admin/users',
        buttonLabel: 'EDIT'
      },
      chat: {
        title: 'Chat',
        subtitle: 'Edit weekly chat schedule',
        image: 'question_answer',
        link: '/admin/chat',
        buttonLabel: 'EDIT'
      },
      callbacks: {
        title: 'Callbacks',
        subtitle: 'Schedule and assign callbacks',
        image: 'call',
        link: '/admin/callback',
        buttonLabel: 'EDIT'
      },
      messages: {
        title: 'Messages',
        subtitle: 'On Production',
        image: 'sms',
        link: '/admin/messages',
        buttonLabel: 'EDIT'
      }
      // team: {
      //   title: 'Team',
      //   subtitle: 'On Production',
      //   image: 'group',
      //   link: '/admin/team',
      //   buttonLabel: 'EDIT'
      // },
    }

    for(let i in cards) {
      adminCards.push(
        <Card key={i} className="card adminCards">
          <CardTitle style={styles.cardTitle} title={<div><FontIcon style={styles.titleIcon} className="material-icons">{cards[i].image}</FontIcon>{cards[i].title}</div>} subtitle={cards[i].subtitle} />
          <CardText></CardText>
          <CardActions>
            <Link to={cards[i].link}><RaisedButton secondary={true} label={cards[i].buttonLabel} /></Link>
          </CardActions>

        </Card>
      )
  }

    return (
      <div style={styles.adminContainer} className="flexRowStart">
        {adminCards}
      </div>
    );
  }
}

export default AdminPanel;
