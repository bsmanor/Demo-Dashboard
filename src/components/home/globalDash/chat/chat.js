import React, { Component } from 'react';
import './chat.css';
// import Firebase
import * as firebase from 'firebase';
// Materiual UI components
import {Card, CardText, CardHeader} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FontIcon from 'material-ui/FontIcon';

// ReCharts
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import loginPage from '../../../login/login-page';

export default class Chats extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {

    let styles = {
      mainContainer: {
        height: 'auto',
        margin: 0
      },
      subCategory: {
        flex: 1,
        paddingRight: '0px'
      },
      headersFontIcon: {
        fontSize: '150%'
      },
      cardHeaderTitle: {
        paddingRight: '0px'
      },
      titleStyle: {
        fontSize: '150%'
      },
      bigFont: {
        color: this.props.styles.successLight
      },
      li: {
        display: 'inline'
      },
      chips: {
        width: 'auto',
        maxWidth: 200,
        margin: '5px auto'
      },
      chipLabelStyle: {
        fontSize: '1.5em'
      }
    }

    let chatsRef = firebase.database().ref().child('chatstats');
    let chats = {};
    chatsRef.on('value', snap => {
      chats = snap.val()
    });
    
    let numberOfChatsHeader = <div>
      <div><FontIcon style={styles.headersFontIcon} className="material-icons">forum</FontIcon></div>
      {this.props.mq ? <div>Number Of Chats</div> : ''}
    </div>;
    let satisfactionHeader = <div>
      <div><FontIcon style={styles.headersFontIcon} className="material-icons">favorite</FontIcon></div>
      {this.props.mq ? <div>Satisfaction</div> : ''}
    </div>;
    let onlineHeader = <div>
      <div><FontIcon style={styles.headersFontIcon} className="material-icons">person</FontIcon></div>
      {this.props.mq ? <div>Online</div> : ''}
    </div>;
    let queuedHeader = <div>
      <div><FontIcon style={styles.headersFontIcon} className="material-icons">group</FontIcon></div>
      {this.props.mq ? <div>Queued</div> : ''}
    </div>;

    const chatRatingData = [
      {name: 'Satisfaction', Good: chats.ratedGood, Bad: chats.ratedBad}
    ]; 

    let liveChatInfo = chats.online;
    let currentChats = [];
    if(liveChatInfo) {
      for(let i in liveChatInfo) {
        let agent = liveChatInfo[i]
        if(agent === 'accepting chats') {
          currentChats.push(
            <Chip key={i} style={styles.chips} labelStyle={styles.chipLabelStyle} className="chips">{i}</Chip>
          )
        } else if(isNaN(agent) === false) {
          currentChats.push(
            <Chip key={i} style={styles.chips} labelStyle={styles.chipLabelStyle} className="chips">{i} : {agent}</Chip>
          )
        }
      }
    }

    return (


      // Component should contain 3 sub-components: Chat component, chat and callback schedule, agents status.
      // Chat and Schedule components are created as sub-components in this folder. Agents status will be imported from from home/team-panel
      <div style={styles.mainContainer} ref="liveChatCards" className="flexRow centerText">
        <Card style={styles.subCategory} className="centerText">
          <CardHeader title={numberOfChatsHeader} titleStyle={styles.titleStyle} textStyle={styles.cardHeaderTitle} />
          <CardText>
            <div style={styles.bigFont} className="bigFont">{chats.numberOfChats}</div>
          </CardText>
        </Card>

        <Card className="centerBlock" style={styles.subCategory}>
          <CardHeader title={satisfactionHeader} titleStyle={styles.titleStyle} textStyle={styles.cardHeaderTitle} />
          <CardText className="centerBlock">
            {this.props.mq 
            ? 
              <BarChart className="centerBlock" width={180} height={100} data={chatRatingData}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="Good" fill={this.props.styles.successLight} />
                <Bar dataKey="Bad" fill={this.props.styles.danger} />
              </BarChart>
            :
              <div>
                <p><FontIcon className="material-icons">thumb_up</FontIcon> {chats.ratedGood}</p>
                <p><FontIcon className="material-icons">thumb_down</FontIcon> {chats.ratedBad}</p>
              </div>
            }
          </CardText>

        </Card>

        <Card className="centerBlock" style={styles.subCategory}>
          <CardHeader title={onlineHeader} titleStyle={styles.titleStyle} textStyle={styles.cardHeaderTitle} />
          <CardText className="centerBlock centerText">
            <div className="chipsHere">{currentChats}</div>
          </CardText>
        </Card>

        <Card style={styles.subCategory}>
          <CardHeader title={queuedHeader} titleStyle={styles.titleStyle}  textStyle={styles.cardHeaderTitle} />
          <CardText>
            <div style={styles.bigFont} className="bigFont">{chats.queued}</div>
          </CardText>
        </Card>
      </div>
    );
  }
}
