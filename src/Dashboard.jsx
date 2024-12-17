import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from './components/Navbar';  // Import the Navbar component
import './Dashboard.css'; // Import the CSS file for styling./Login.css

// dashboard styling
import thome from './assets/homelogo.png';
import texplore from './assets/texplore.png';
import tnotif from './assets/tnotif.png';
import tmessage from './assets/tmessage.png';
import tgrok from './assets/tgrok.png';
import tcomm from './assets/tcomm.png';
import tprem from './assets/tprem.png';
import tprofile from './assets/tprofile.png';
import tmore from './assets/tmore.png';
import bluelogo from './assets/bluelogo.png';
import rockstar from './assets/rockstar.jpg';
import section from './assets/section.png';
import tft from './assets/tft.jpg';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';


function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* Verify if User In-Session in LocalStorage */
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const decoded_token = jwtDecode(token);
      setUser(decoded_token);
    } catch (error) {
      navigate('login');
    }
  }, [navigate]); // Add navigate to the dependency array

  /* Performs Logout Method */
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
    {/* handles the logout process on the dashboard */}
      <NavbarComponent user={user} handleLogout={handleLogout} />
    <>
 
     {/* dashboard page */}  


     

 <Container>
  <Row>

    <Col sm={3}>
<div style={{ marginLeft: '10px', color: 'white', }}>
<b>
<img src={thome} width="40px" alt="Homelogo" />Home<br/><br/>
<img src={texplore} width="40px" alt="Explorelogo" />Explore<br/><br/>
<img src={tnotif} width="40px" alt="Notiflogo" />Notification<br/><br/>
<img src={tmessage} width="40px" alt="Messagelogo" />Messages<br/><br/>
<img src={tgrok} width="40px" alt="Groklogo" />Grok<br/><br/>
<img src={tcomm} width="40px" alt="Communitieslogo" />Communities<br/><br/>
<img src={tprem} width="40px" alt="Premiumlogo" />Premium<br/><br/>
<img src={tprofile} width="40px" alt="Profilelogo" />Profile<br/><br/>
<img src={tmore} width="40px" alt="Morelogo" /> More<br/><br/>
</b>

<Button variant="light" style={{ minWidth: '220px',height : '50px', color: 'black', borderRadius: '100px' }}>
  <strong>Post</strong>
</Button>
<br/><br/><br/><br/>
<Image src="https://pbs.twimg.com/profile_images/1867934644811010049/rANiK5-j_400x400.jpg" 
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    }}/>

<b style={{  marginLeft: '10px', marginTop: '-80px', fontSize: '18px' }}>John Carlo Sarmiento</b>
<br/>
<span className="text" style={{ fontSize: '15px', color: 'grey', marginLeft: '45px' }}>@john_carlo78035</span>

<b style={{marginLeft: '80px', fontSize: '13px'}}>•••</b>

</div>


</Col>

<Col sm={6} style={{
  borderLeft: '1px grey solid',
  borderRight: '1px grey solid',
  paddingLeft: '30px', // add some padding to move the content away from the border
  paddingRight: '20px', // add some padding to move the content away from the border
}}>

<hr style={{
  height: '1px',
  border: 'none',
  backgroundColor: '#ccc'
}} />

  <Image src="https://pbs.twimg.com/profile_images/1867934644811010049/rANiK5-j_400x400.jpg" 
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    }}/>
  <span className="text" style={{ fontSize: '20px' }}>&nbsp; What is happening?!</span>

<br/>
  <img src={bluelogo} style= {{ marginLeft: '40px' }} width="200px" alt="bluelogo" />

  <Button variant="secondary" style= {{ minWidth: '70px', color: 'black',marginLeft: '280px', borderRadius: '100px' }}><strong>Post</strong></Button>

  <hr style={{
  height: '1px',
  border: 'none',
  backgroundColor: '#ccc'
}} />


<img src={rockstar} style= {{ marginLeft: '5px' }} width="40px" alt="bluelogo" />

&nbsp;&nbsp;<b style={{ fontSize: '16px' }}>Rockstar Games</b> <span className="text" style={{ fontSize: '15px', color: 'grey' }}>&nbsp; @Rockstar Games . 22h</span>

<p style={{ color: 'white', marginLeft: '55px' }}>Anyone who completed an eligible Heist Finale during The Heist Challenge has received the NOOSE Law Enforcement Outfit.
<br/><br/>
Today is also the last day to claim the Police Predator Boat free from Warstock Cache & Carry.</p>

<Card style={{ width: '80%',marginLeft: '40px', border: 'none' }}>
<Card.Img variant="top" src="https://pbs.twimg.com/media/GecjAtGXwAAGYcd?format=jpg&name=small" />
</Card>

<br/>
<img src={section} style= {{ marginLeft: '40px' }} width="90%" alt="sectionbottom" />

<hr style={{
  height: '1px',
  border: 'none',
  backgroundColor: '#ccc'
}} />


</Col>


<Col sm={3}>
<br/>
<Card border= 'dark' style={{ width: '20rem',backgroundColor: 'black', borderRadius: '20px', color: 'white' }}>
      <Card.Body>
        <Card.Title><b>Subscribe to Premium</b></Card.Title>
        <Card.Text>
        Subscribe to unlock new features and if eligible, receive a share of revenue.
        </Card.Text>
        <Button style={{backgroundColor: 'dodgerblue', color: 'white', fontSize: '15px', borderRadius: '100px', height: '40px', minWidth: '110px'}}><strong>Subscribe</strong></Button>
      </Card.Body>
    </Card>
<br/>
    <Card border= 'dark' style={{ backgroundColor: 'black', borderRadius: '20px', color: 'white',width: '20rem', height: '40rem' }}>
    <Card.Title style={{ marginLeft: '10px', marginTop: '10px'}}><b>What's happening</b></Card.Title>
    <Card.Img variant="top" src={tft} style={{ width: '27%', height: '80px', borderRadius: '20px', marginLeft: '10px', marginTop: '10px' }} />
    <b style={{  marginLeft: '100px', marginTop: '-80px' }}>Teamfight Tactics (TFT) Macao Open</b>
      <Card.Body>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}> Trending in Philippines</span>
        <br/>
        <b>#KissesDelavin</b>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}>1949 posts</span>
        
        <br/>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}> Music . Trending</span>
        <br/>
        <b style= {{ fontSize: '17px' }}>TREASURE 2025 FIRST US TOUR</b>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}>15.3k posts</span>

         
        <br/>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}> Trending in Anime</span>
        <br/>
        <b style= {{ fontSize: '17px' }}>15 Anime Piracy Sites Worth 15M Views.</b>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}>10.9k posts</span>

        <br/>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}> Movies . Trending</span>
        <br/>
        <b style= {{ fontSize: '17px' }}>Squid Game 2 Is Rumoured To Be Release This Year</b>
        <br/>
        <span style={{ fontSize: '15px', color: 'grey' }}>167k posts</span>
        
        <br/>
        <br/>
        <p style= {{ color: 'dodgerblue'}}> Show more</p>
        <Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>

</Col>

</Row>
</Container>
<hr/>

</>
</>
  );
}

export default Dashboard;