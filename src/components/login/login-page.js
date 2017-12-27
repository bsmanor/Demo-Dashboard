import React, { Component } from 'react';
import './login-page.css';
import * as firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Card,CardTitle,CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
      open: true,
      emailErrorText: null,
      passwordErrorText: null
    }


    // Firebase function that listens to user login status changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      let user = firebase.auth().currentUser;
      let email, uid;

      if (user != null) {
        email = user.email;
        uid = user.uid;
        console.log('currently logged in as: ' + email + '\nUID: ' + user.uid);
        this.logUserIn(uid, email);
      }
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  login = () => {
    // get email and password from login form
    let email = this.refs.email.input.value;
    let password = this.refs.password.input.value;
    if(email.length == 0 || password.length == 0) {
      if(email.length == 0) {
        this.setState({emailErrorText: 'Enter email address'})
      };
      if(password.length == 0) {
        this.setState({passwordErrorText: 'Enter password'})
      }
      return;
    }
    // set Firebase and sign user in
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => {
      console.log(e.message)
    })
    // if login is successful, then "onAuthStateChanged" will be triggered (in the constructor)
  };

  logUserIn(uid, email, name) {
    this.props.logUserIn(uid, email, name)
  };

  onEnterKeyPress = (e) => {
    if(e.key === 'Enter') { this.login() } else { return }
  }


  render() {

    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        disabled={false}
        onClick={this.login}
      />
    ];
    const loginDialog = {
    }

    const styles = {
      textField: {
      },
      cardHeader: {
        paddingRight: 0,
        width: '100%',
        textAlign: 'center'
      },
      loginCardHeaderImg: {
        backgroundImage: "url('https://images.pexels.com/photos/575226/pexels-photo-575226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')",
        backgroundSize: 'cover',
        width: 120,
        height: 120,
        borderRadius: '50%',
        display: 'block',
        margin: '30px auto',
        textAlign: 'center'
      },
      devider: {
        height: 3
      },
      creds: {
        color: '#37BBD4'
        
      }
    }

    return (
      <div className="mainContainer">
      <img className="bgImage" src="https://images.pexels.com/photos/64778/pexels-photo-64778.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb" />
        <Card className="cardContainer">
          <CardHeader
            textStyle={styles.cardHeader} 
            title={<div className="loginTitle">LOGIN</div>}
            subtitle={
              <div style={styles.loginCardHeaderImg}>
              </div>
            }
          />
          <Divider style={styles.devider}/>
          <CardText>
            <TextField
              errorText={this.state.emailErrorText} 
              fullWidth={true} 
              type="email" ref="email" 
              hintText="Email" 
              floatingLabelText="Email" 
              onKeyPress={this.onEnterKeyPress} /><br 
            />
            <TextField 
              fullWidth={true} 
              errorText={this.state.passwordErrorText}
              type="password" 
              ref="password" 
              hintText="Password" 
              floatingLabelText="Password" 
              onKeyPress={this.onEnterKeyPress} 
            />
            <Divider style={styles.devider}/>
            <span style={styles.creds}><br />
              Demo Creds:<br />
              <code>
                Email: bsmanor@gmail.com<br />
                Password: 123456
              </code>
            </span>
          </CardText>

          <CardActions>
            <RaisedButton label="LOGIN" fullWidth={true} primary={true} onClick={this.login}/>
          </CardActions>

        </Card>
      </div>
    );
  }
}

export default LoginPage;
