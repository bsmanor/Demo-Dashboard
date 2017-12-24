import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as firebase from 'firebase';
// Material-UI imports
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey100,grey400,green500, orange300,deepOrange400,
  lightGreen300,lightGreen500,blueGrey700,blueGrey800,blueGrey500,blueGrey50,blueGrey100 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';

import NavBar from './components/navBar/navBar';
import Home from './components/home/home';
import About from './components/navBar/about';
import LoginPage from './components/login/login-page';
import AdminPanel from './components/adminPanel/adminPanel';
import AddCallback from './components/adminPanel/editUpcomingCallbacks/addCallback';
import EditChat from './components/adminPanel/editChatSchedule/editChat';
import EditUserStates from './components/adminPanel/editUserStates/editUserStates';
import Team from './components/adminPanel/editTeamstates/team';
import Messages from './components/adminPanel/messages/messages';
import GlobalDash from './components/home/globalDash/globalDash'
injectTapEventPlugin();

class App extends Component {

  constructor() {
    super();
    this.state = {
      fb: {},
      // Media Query related
      mq: null,
      // user's details
      isLoggedIn: null,
      email: null,
      uid: null,
      // global style theme
      styles: {
        // material UI related:
        primary1: blueGrey800, // primary, toggle end on
        primary2: blueGrey500,
        primary3: grey400, // toogle body off
        accent1: green500, // secondary
        accent2: grey100, // toggle end off
        accent3: grey400,
        pickerHeader: blueGrey500,
        canvasColor: blueGrey700,
        textColor: blueGrey100,
        alternateTextColor: blueGrey50,
        subTextColor: grey400,
        disabledTextColor: blueGrey500,
        // customized:
        alert: orange300,
        success: lightGreen500,
        successLight: lightGreen300,
        danger: deepOrange400,
        userBar: '#37474F',
        // Font and avatar Sizes
        floatingLabelTextColor: {color: blueGrey100},
        defaultTextSize: {fontSize: '115%'},
        cardHeaderTitle: {fontSize: '125%'},
        avatarSize: {height: 70, width: 70, borderRadius:'50%',margin: '0px 15px 15px 0px'}
      },
      // Snack related states
      snackState: false,
      message: ''
    }
  }

  checkMediaQuery = () => {
    let mq = matchMedia( "(min-width: 750px)" )
    if(mq.matches === true) {
      this.setState({mq: true})
    } else {
      this.setState({mq: false})
    }
  }

  // log user in upon sign in - gets update from the "Login" component
  logUserIn(uid, email) {
    this.setState({
      isLoggedIn: true,
      email: email,
      uid: uid
    })
  }
  
  // change isLoggedIn state value to 'false' - gets update from the "NavBar" component
  logUserOut() {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false
    })
  }
  
  openSnack = (message) => {
    this.setState({
      snackState: true,
      message: message
    });
  };
  handleRequestClose = () => {
    this.setState({
      snackState: false,
    });
  };
  
  componentWillMount() {
    this.checkMediaQuery();

    //create firebase reference
    const firebaseRef = firebase.database().ref();
    let fb;
    firebaseRef.on('value', snap => {
      fb = snap.val();
      this.setState({
        fb: fb
      })
    });
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.checkMediaQuery);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkMediaQuery);
  }

  render() {

    // set Material UI
    const muiTheme = getMuiTheme({
      fontFamily: 'Roboto, sans-serif',
      palette: {
        primary1Color: this.state.styles.primary1,
        primary2Color: this.state.styles.primary2,
        primary3Color: this.state.styles.primary3,
        accent1Color: this.state.styles.accent1,
        accent2Color: this.state.styles.accent2,
        accent3Color: this.state.styles.accent3,
        pickerHeaderColor: this.state.styles.pickerHeader,
        canvasColor: this.state.styles.canvasColor,
        textColor: this.state.styles.textColor,
        alternateTextColor: this.state.styles.alternateTextColor

      }
    });

    let styles = {
      appContainer: {
        backgroundColor: this.state.styles.primary1
      },
      snackBar: {
        textAlign: 'center',
        color: '#F57C00'
      }
    }

      if(this.state.isLoggedIn) {
        return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.appContainer} className="mainAppContainer">
            <Router>
              <div>
                <Route path='/' component={() => (<NavBar mq={this.state.mq} openSnack={this.openSnack} styles={this.state.styles} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} logUserOut={this.logUserOut.bind(this)} />)} />
                <Route exact path='/' component={() => (<GlobalDash mq={this.state.mq} openSnack={this.openSnack} styles={this.state.styles} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} />)} />
                <Route exact path='/about' component={() => (<About mq={this.state.mq} openSnack={this.openSnack} styles={this.state.styles} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} />)} />
                {/* <Route exact path='/home' component={() => (<Home styles={this.state.styles} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} />)} /> */}
                <Route exact path='/admin' component={() => (<AdminPanel mq={this.state.mq} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
                <Route exact path='/admin/chat' component={() => (<EditChat openSnack={this.openSnack} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
                <Route exact path='/admin/callback' component={() => (<AddCallback openSnack={this.openSnack} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
                <Route exact path='/admin/users' component={() => (<EditUserStates openSnack={this.openSnack} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
                <Route exact path='/admin/team' component={() => (<Team openSnack={this.openSnack} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
                <Route exact path='/admin/messages' component={() => (<Messages openSnack={this.openSnack} user={{uid:this.state.uid, email:this.state.email, name: this.state.name}} styles={this.state.styles} />)} />
              </div>
            </Router>
            <Snackbar
              open={this.state.snackState}
              message={this.state.message}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
              contentStyle={styles.snackBar}
            />
            </div>
          </MuiThemeProvider>
        );
      } else {
        return (
          <MuiThemeProvider>
            <div className="App" style={styles.appContainer}>
              <LoginPage logUserIn={this.logUserIn.bind(this)}/>
            </div>
          </MuiThemeProvider>
        )
      }
  }
}

export default App;
