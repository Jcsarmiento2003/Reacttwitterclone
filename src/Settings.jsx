import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './Api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Settings.css';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);  // State for selected user
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const headers = { accept: 'application/json', Authorization: token };

    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error decoding token", error);
                navigate("/login");
            }
        };
        fetchDecodedUserID();
    }, [navigate, token]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${API_ENDPOINT}/user`, { headers });
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const createUser = async (e) => {
        e.preventDefault();
        const userData = { fullname, username, password };
        try {
            const { data } = await axios.post(`${API_ENDPOINT}/auth/register`, userData, { headers });
            Swal.fire({ icon: 'success', text: data.message });
            fetchUsers();
            setShow(false);
        } catch (error) {
            Swal.fire({ icon: 'error', text: error.response?.data?.message || 'An error occurred during registration.' });
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        const userData = { fullname, username, password };
        try {
            const { data } = await axios.put(`${API_ENDPOINT}/user/${selectedUser.user_id}`, userData, { headers });
            Swal.fire({ icon: 'success', text: data.message });
            fetchUsers();
            setShow(false);
            setSelectedUser(null);
        } catch (error) {
            Swal.fire({ icon: 'error', text: error.response?.data?.message || 'An error occurred during update.' });
        }
    };

    const handleShow = (user = null) => {
        if (user) {
            setSelectedUser(user);
            setFullname(user.fullname);
            setUsername(user.username);
            setPassword('');
        } else {
            setSelectedUser(null);
            setFullname('');
            setUsername('');
            setPassword('');
        }
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
        setFullname('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <Button variant="success" onClick={() => handleShow()}>Create New User</Button>

            {/* Create/Update User Modal */}
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? 'Update User' : 'Create User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={selectedUser ? updateUser : createUser}>
                        <Row>
                            <Col>
                                <Form.Group controlId="Name">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Full Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="Username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required={!selectedUser}
                                    />
                                    {selectedUser && <Form.Text className="text-muted">Leave blank to keep the current password.</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">{selectedUser ? 'Update User' : 'Create User'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Users Table */}
            <h3>Users List</h3>
            {users.length > 0 ? (
                <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'Center' }}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleShow(user)}>Update</Button>
                                    <Button variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default Settings;