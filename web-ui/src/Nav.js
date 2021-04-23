import {Button, Container, Form, Nav, Alert} from 'react-bootstrap';
import {NavLink, useHistory} from 'react-router-dom';
import React, {useState} from "react";
import store from './store';
import {login} from "./api";
import {connect} from "react-redux";

function Link({to, children}) {
    return (
        <Nav.Item>
            <NavLink to={to} exact className="nav-link" activeClassName="active">
                {children}
            </NavLink>
        </Nav.Item>
    );
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function on_submit(ev) {
        ev.preventDefault();
        await login(email, password);
    }

    return (
        <Form onSubmit={on_submit} inline>
            <Form.Control placeholder="Email"
                          type="text"
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}/>
            <Form.Control placeholder="Password"
                          type="password"
                          onChange={(event) => setPassword(event.target.value)}
                          value={password}/>
            <Button type="submit">
                Login
            </Button>
            <NavLink to="/users/new" exact>
                Register
            </NavLink>
        </Form>
    );
}

function LoggedIn({user_session}) {
    const history = useHistory();
    const logout = event => {
        event.preventDefault();
        store.dispatch({ type: 'user_session/clear' });
        store.dispatch({ type: 'logged_in_user/clear' });
        history.push("/");
    };

    return (
        <Container>
            <span>Welcome, {user_session.name}</span>
            <Button type="submit" onClick={logout}>
                Logout
            </Button>
            <Nav variant="pills">
                <Link to="/">Events</Link>
                <Link to="/users">Users</Link>
            </Nav>
        </Container>
    );
}

function AppNav({user_session, error}) {

    const nav = user_session ? <LoggedIn user_session={user_session}/> : <Login/>;

    return (
        <Container>
            {nav}
            {error && <Alert variant={"danger"}>{error}</Alert>}
        </Container>
    );
}

export default connect(({error, user_session})=>({error, user_session}))(AppNav);
