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
      }
    }

    return (
      <div className="aboutContainer">

        <Avatar style={styles.logo} src="https://lh3.googleusercontent.com/ZaM9UMiAJn4bkYFN3Z-FA9kcUo633Li--QKOQQMUnX8monLH7jB0wx75ekzCf9iX80D0AZEIg6EzKIL4iVDQhVtg7E48oDD-kdZ6-0U1OixhCgCjeSgxOKj1J44-pctTlJZS26szvCByzEq-gRSQtAHZQq-h-ujaeGUvAKEZzS3KDiEAY27DAYXTrklsimd6QHIeXVWJq3oG1FLKKp0emsp4A12HrhC9OACDbc0YVNFrvCACpjDziaTSHVRWGc8addX3Qbh_y6sahIy-7_PuOwOFKDKZrECdGaIxidPmUwV5y8RJO3EQJFv4Npp01sAYsIdl8XH_1PVndAQGjy2CvEpsUG1kjNmj77mqBgwB9JPLcYvPZ4r5W2y98OpHE3NUf3cTSbxZdDDm8xuPyVuZX5BTpCs8EZG_BsiAGocMCgeVNC0aLucxZ2GZ6oqWzBP_IKDCWpGotPrG9iDDqlHk6VVHzRW874hH6H13Z5sXznNEWKxNLV3b51SSR91WVLFS5ii-ok4A4nq50IWTj0_A2gW4KMJhFl9BTYVBgsc_cOtaaAEES5UB3lvM_3KK4bdHHfitC0GQp0ncugRyyNA3QB-Kdowm64DtnvZb-ig=s405-no" size={150}/>

          <h2>About Myself</h2>

          <p>
            My name is Manor Ben-shimon, I'm 30 years old and currenly living in Tel Aviv. <br />
            I'm a B.A graduate in behavioral science, but as I realized that my real passion 
            lies on technology, I've decided to shift towards the high-tech industry, focusing mainly on frond end development.
          </p>
          <p>
            During the last 2 years I've learned the basics of frond end development - HTML, CSS and JavaScript, but fast enough 
            I've embraced the more advanced frameworks - Angular and React.(personaly, I fell in love with Angular...)
          </p>
          <p>
            At that time I started working at TUNE under the "HasOffers" product as a support engineer. As part of the support team I 
            dealt with a variaty of topics, including: building API requests using the HasOffers API service, code integrations and web-tracking 
            related queries, which greatly improoved my understanding of the browser and the HTTP protocol. The support team is also working closly 
            to the R&D team and are accountable for finding bgus and escalate to R&D.<br />
            (The support team assists the company's clients world wide, and the entire internal and external comunication is in English) 
          </p>
          <p>
            Determined to improove my developer skills and encouraged by my manager, I initiated a new project - building a dashboard for the support team, 
            that will group all of the team's the day-to-day tasks in one place. This Demo-Dashboard project is based on that dashboared that I built. 
          </p>

          <h2>About The Project</h2>
          <p>
            This project was built with React and uses the Material-UI library as the design framework.
            For hosting, database and authentication serivices I've used Google Firebase, thus, 
            all data is retrived in real time from Firebase database and Firebase authentication services.<br />
            This project is also avaiable on <a href="#" className="link">GitHub</a>.
          </p>
          

      </div>
    );
  }
}

export default About;
