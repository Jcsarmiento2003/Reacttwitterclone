import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './Api'; // Make sure API_ENDPOINT is correctly imported

import './Login.css';  
import twitterlogo from './assets/twitterlogo.jpg';



function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if there's a valid token in localStorage and redirect if present
  useEffect(() => {
    const fetchUser = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds
          if (decodedUser.exp < currentTime) {
            localStorage.removeItem('token'); // Remove expired token
          } else {
            setUser(decodedUser);
            navigate('/dashboard'); // Navigate to dashboard if token is valid
          }
        }
      } catch (error) {
        console.error('Error verifying user session:', error);
        localStorage.removeItem('token'); // Invalidate token if decoding fails
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      // API request to login backend
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        fullname,  // send fullname along with username and password
        username,
        password,
      });
  
      // Check if the response was successful
      if (response.status === 200) {
        // On successful authentication, store the token in localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setError('');
          setLoading(false); // Stop loading
          navigate('/dashboard'); // Redirect to the dashboard
        } else {
          setError('Invalid credentials. Please try again.');
          setLoading(false); // Stop loading
        }
      } else {
        // If the response was not successful, display an error message
        setError(`Error logging in: ${response.statusText}`);
        setLoading(false); // Stop loading
      }
    } catch (error) {
      // If there was an error with the Axios request, display an error message
      setError(`Error logging in: ${error.message}`);
      setLoading(false); // Stop loading
      console.error('Error logging in', error);
    }
  };

  return (

    <Container className="login-container ">
      <Row className="justify-content-md-center">
        <Col md={7}> 
              <br/><br/><br/><br/><br/><br/>    
          <div className="login-logo mb-4" style={{ display: 'flex'}}>
              <img src={twitterlogo} width="67%" alt="twitter logo" />
          </div>
          </Col>
              <Col md={5}>
              <br/><br/><br/><br/>
              <div className="login-form" style ={{ color: 'white' }}>
              <div className="container text-center">

              <h1 style= {{ marginBottom: '40px',}}>Happening&nbsp;now</h1>
              <h2 className="mb-4">Join today.</h2>
              
              <div className="card">
                <div className="card-body login-card-body">
                  <form onSubmit={handleSubmit}>

                    
                    {/* Fullname Input Field */}
                    <Form.Group controlId="formFullname" className="mb-3">
                      <Form.Label>Fullname:</Form.Label>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="text"
                        placeholder="Enter Fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Username Input Field */}
                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Password Input Field */}
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Display error message if any */}
                    {error && <p className="text-danger mb-3">{error}</p>}

                    {/* Submit Button */}
                    <Form.Group controlId="formButton" className="d-grid gap-2">
                      <Button
                        variant="dark"
                        className="btn btn-block bg-custom btn-flat rounded-0"
                        size="lg"
                        type="submit"
                        disabled={loading} // Disable button when loading
                      >
                        {loading ? 'Logging in...' : 'Login Now'}
                      </Button>
                    </Form.Group>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
