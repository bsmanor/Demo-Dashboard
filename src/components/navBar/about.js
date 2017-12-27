import React, { Component } from 'react';
import './about.css';
// import Firebase
import * as firebase from 'firebase';
// importing material-ui components
import ActionHome from 'material-ui/svg-icons/action/home';
import Avatar from 'material-ui/Avatar';

class About extends Component {

  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
      
    let styles = {
      logo: {
        display: 'block',
        margin: '0px auto'
      },
      emph: {
        color: this.props.styles.success
      }
    }

    return (
      <div className="aboutContainer">

        <Avatar style={styles.logo} src="https://lh3.googleusercontent.com/ZaM9UMiAJn4bkYFN3Z-FA9kcUo633Li--QKOQQMUnX8monLH7jB0wx75ekzCf9iX80D0AZEIg6EzKIL4iVDQhVtg7E48oDD-kdZ6-0U1OixhCgCjeSgxOKj1J44-pctTlJZS26szvCByzEq-gRSQtAHZQq-h-ujaeGUvAKEZzS3KDiEAY27DAYXTrklsimd6QHIeXVWJq3oG1FLKKp0emsp4A12HrhC9OACDbc0YVNFrvCACpjDziaTSHVRWGc8addX3Qbh_y6sahIy-7_PuOwOFKDKZrECdGaIxidPmUwV5y8RJO3EQJFv4Npp01sAYsIdl8XH_1PVndAQGjy2CvEpsUG1kjNmj77mqBgwB9JPLcYvPZ4r5W2y98OpHE3NUf3cTSbxZdDDm8xuPyVuZX5BTpCs8EZG_BsiAGocMCgeVNC0aLucxZ2GZ6oqWzBP_IKDCWpGotPrG9iDDqlHk6VVHzRW874hH6H13Z5sXznNEWKxNLV3b51SSR91WVLFS5ii-ok4A4nq50IWTj0_A2gW4KMJhFl9BTYVBgsc_cOtaaAEES5UB3lvM_3KK4bdHHfitC0GQp0ncugRyyNA3QB-Kdowm64DtnvZb-ig=s405-no" size={150}/>

          <h2>About myself</h2>

          <p>
            My name is Manor Ben-Shimon, I'm 30 years old and currently living in Tel Aviv. <br />
            I'm a B.A graduate in behavioral science that fell in love with front-end development...
            {/* but as I realized that my real passion lies in technology, I've decided to shift towards the high-tech industry, focusing mainly on  */}
          </p>
          <p>
            During the last 2 years I've learned the basics of front-end development - <span style={styles.emph}>HTML, CSS</span>, 
            and <span style={styles.emph}>JavaScript</span>, but fast enough 
            I've embraced the more advanced frameworks - <span style={styles.emph}>Angular</span> and <span style={styles.emph}>React</span>.
          </p>
          <p>
            At that time I started working at <a href="http://www.hasoffers.com/" className="link" target="_blank">TUNE</a> as a support engineer, dealling mainly with code integrations and web-tracking 
            related queries.
            {/* (The support team assists the company's clients worldwide, and the entire internal and external communication is in English)  */}
          </p>
          <p>
            Determined to improve my developer skills I initiated a new project - building a dashboard for the support team, 
            that will group all of the team's the day-to-day tasks in one place. This Demo-Dashboard project is based on that dashboard that I built. 
          </p>

          <h2>About the project</h2>
          <p>
            This project was built with React and uses the Material-UI library as the design framework.
            For hosting, database and authentication services I've used <span style={styles.emph}>Google Firebase</span>, thus, 
            all data is retrieved in real time from Firebase database and Firebase authentication services.<br />
            This project is also available on <a href="https://github.com/bsmanor/Demo-Dashboard" className="link" target="_blank">GitHub</a>.
          </p>          
      </div>
    );
  }
}

export default About;
