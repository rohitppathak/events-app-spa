import React from 'react';

import "./App.scss";
import Nav from "./Nav";
import { Switch, Route } from 'react-router-dom';
import {Container} from "react-bootstrap";
import Users from "./Users";
import Events from "./Events";
import Event from "./Event";
import UsersNew from "./UsersNew";

function App() {
    return (
        <Container>
            <Nav/>
            <Switch>
                <Route path="/" exact>
                    <Events/>
                </Route>
                <Route path="/events/:id">
                    <Event />
                </Route>
                <Route path="/users" exact>
                    <Users />
                </Route>
                <Route path="/users/new">
                    <UsersNew />
                </Route>
            </Switch>
        </Container>
    );
}

export default App;
