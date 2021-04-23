import React, {useEffect} from 'react';

import "./App.scss";
import Nav from "./Nav";
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {Container} from "react-bootstrap";
import Users from "./Users";
import Events from "./Events";
import Event from "./Event";
import UsersNew from "./UsersNew";
import {fetch_user} from "./api";
import CUEvent from "./CUEvent";

function App({logged_in_user, user_session}) {
    useEffect(async () => {
        if (user_session) {
            await fetch_user(user_session.user_id)
        }
    }, [user_session]);

    let data = null;
    if (logged_in_user) {
        data = (
            <Container>
                <Switch>
                    <Route path="/" exact>
                        <Events/>
                    </Route>
                    <Route path="/events" exact>
                        <Events/>
                    </Route>
                    <Route path="/events/new" exact>
                        <CUEvent />
                    </Route>
                    <Route path="/events/:id/edit">
                        <CUEvent />
                    </Route>
                    <Route path="/events/:id">
                        <Event />
                    </Route>
                    <Route path="/users" exact>
                        <Users />
                    </Route>
                    <Route path="/users/:id/edit" exact>
                        <UsersNew />
                    </Route>
                    <Route path="/users/new">
                        <UsersNew />
                    </Route>
                </Switch>
            </Container>
        );
    } else {
        data = <UsersNew />;
    }

    return (
        <Container>
            <Nav/>
            {data}
        </Container>
    );
}

export default connect(({logged_in_user, user_session})=>({logged_in_user, user_session}))(App);
