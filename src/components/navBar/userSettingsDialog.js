import React, {Component} from 'react';
import * as firebase from 'firebase';
// Material UI components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class UserSettingsDialog extends Component {

  updateUserPassword = () => {
    let auth = firebase.auth();
    let emailAddress = this.props.user.email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }

  updateUserImage = () => {
    let imageUrl = this.refs.userImageUrl.input.value;
    firebase.database().ref().child('agents').child(this.props.user.uid).child('avatarUrl').set(imageUrl);
    this.props.openSnack('IMAGE UPDATED');
  }

  updateUserZendeskName = () => {
    let zendeskName = this.refs.zendeskName.input.value;
    firebase.database().ref().child('agents').child(this.props.user.uid).child('zendeskName').set(zendeskName);
    this.props.openSnack('ZENDESK NAME UPDATED');
  }

  render() {

    let styles = {
      userSettingsCards: {
        width: 250
      },
      cardHeader: {
        backgroundColor: this.props.styles.accent3,
        height: 50
      },
      updatePassword: {
        color: this.props.styles.primary3,
        cardText: {
          height: 104.5
        }
      }
    }

    return (
      <div>
        <h2>My Account</h2>
        <div className="flexRowStart">
          <Card className="card autoHeight" style={styles.userSettingsCards}>
            <CardHeader className="cardHeader" title="Update Password" />
            <CardText style={styles.updatePassword.cardText}>
              <div style={styles.updatePassword}>An email will be sent to: {this.props.user.email}, with a link for updating the password</div>
            </CardText>
            <CardActions>
              <RaisedButton label="RESET PASSWORD" secondary={true} onClick={this.updateUserPassword} />
            </CardActions>
          </Card>

          <Card className="card autoHeight" style={styles.userSettingsCards}>
            <CardHeader className="cardHeader" title="Upload Image" />
            <CardText className="flexRow">
              <TextField ref="userImageUrl" hintText="Paste image URL here" floatingLabelText="Image URL" />
              <span style={{color: this.props.styles.accent3}}>Copy here an image URL of your own</span>
            </CardText>
            <CardActions>
              <RaisedButton label="SAVE IMAGE" secondary={true} onClick={this.updateUserImage} />
            </CardActions>
          </Card>

          <Card className="card autoHeight" style={styles.userSettingsCards}>
            <CardHeader className="cardHeader" title="ZENDESK NAME" />
            <CardText className="flexRow">
              <TextField ref="zendeskName" hintText="Example: John D" floatingLabelText="Zendesk name" />
              <span style={{color: this.props.styles.primary3}}>Notice! case sensitive!</span>
            </CardText>
            <CardActions>
              <RaisedButton label="SAVE" secondary={true} onClick={this.updateUserZendeskName} />
            </CardActions>
          </Card>

      </div>

        <RaisedButton style={{float: 'right'}} primary={true} label="CLOSE" onClick={this.props.close} />
      </div>
    );
  }
}

UserSettingsDialog.propTypes = {
};
