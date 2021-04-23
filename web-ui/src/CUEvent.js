import {connect} from "react-redux";
import {Link, useParams, useHistory} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {fetch_user, get_event, new_event, update_event} from "./api";



function CUEvent({logged_in_user}) {
    const {id} = useParams();
    const history = useHistory();

    const [event, setEvent] = useState(
        {
            title: "",
            body: "",
            date: ""
        });

    useEffect(() => {
        get_event(id).then((ev) => setEvent(ev))
    }, [id]);

    const cuEvent = async (ev) => {
        ev.preventDefault();
        const body = {...event, user_id: logged_in_user.id};
        const resp = (await (id ? update_event(body, id) : new_event(body))).data;
        await fetch_user(logged_in_user.id);
        history.push(`/events/${resp.id}`)
    };

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control value={event.title} onChange={ev => setEvent({...event, title: ev.target.value})} type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body:</Form.Label>
                    <Form.Control value={event.body} onChange={ev => setEvent({...event, body: ev.target.value})} type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control value={event.date} onChange={ev => setEvent({...event, date: ev.target.value})} type="date"/>
                </Form.Group>
                <Button onClick={cuEvent} disabled={event.title === "" || event.body === "" || event.date === ""} variant="primary" type="submit">
                    {id ? "Update" : "Create"}
                </Button>
            </Form>
        </Container>
    )
}

export default connect(({logged_in_user}) => ({logged_in_user}))(CUEvent);

