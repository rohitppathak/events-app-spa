import {Button, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {get_event, new_invite, update_invite} from "./api";
import store from './store';

function Event({user_session}) {
    const {id} = useParams();

    const [event, setEvent] = useState(
        {
            title: "",
            body: "",
            invites: [],
            comments: [],
            owner: {}
        });

    const [newInvite, setNewInvite] = useState("");

    useEffect(() => {
        get_event(id).then((ev) => setEvent(ev))
    }, [id]);

    const update = () => {
        get_event(id).then((ev) => setEvent(ev))
    };

    const current_user_id = user_session && user_session.user_id;
    const owner = current_user_id === event.owner.id;
    console.log(event.invites);
    console.log(current_user_id);
    const matchingInvites = event.invites.filter(invite => invite.user.id === current_user_id);
    const currentInvite = matchingInvites.length && matchingInvites[0];
    const invitee = current_user_id && event.invites.reduce((ans, invite) => ans || invite.user.email === user_session.email, false)

    const [status, setStatus] = useState(1);
    const [comment, setComment] = useState(currentInvite && currentInvite.comment);

    const invite_info = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
    };
    const invite_words = {
        0: "No response",
        1: "Not attending",
        2: "May be attending",
        3: "Will be attending",
    };

    const invite = async event => {
        event.preventDefault();
        const result = await new_invite(newInvite, id);
        if (result.error) {
            store.dispatch({
                type: 'error/set',
                data: result.error,
            })
        }
        update();
    };

    const updateInvite = async event => {
        event.preventDefault();
        console.log(currentInvite, status, comment);
        const result = await update_invite(currentInvite.id, status, comment);
        update();
    };

    event.invites.forEach(invite => invite_info[invite.status]++);
    return (<Container>
            {owner ? <Link to={`/events/${id}/edit`}>Edit</Link> : null}
            <Link to={`/`}>Back</Link>
            <h1>{event.title}</h1>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        {event.body}
                    </div>
                    <div className={"row"}>
                        {event.date}
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    {invitee ? (
                        <Container>
                            <div className={"row"}>
                                Update your status:
                            </div>
                            <Form>
                                <Form.Group controlId={"formStatus"}>
                                    <Form.Label>Status:</Form.Label>
                                    <Form.Control onChange={(event) => setStatus(event.target.value)} as={"select"}>
                                        <option value={1}>Not attending</option>
                                        <option value={2}>Maybe</option>
                                        <option value={3}>Attending</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId={"formComment"}>
                                    <Form.Label>Comment:</Form.Label>
                                    <Form.Control onChange={(event) => setComment(event.target.value)} type="text"/>
                                </Form.Group>
                                <Button onClick={updateInvite} variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Container>
                    ) : null}
                </div>
                <div className={"col"}>
                    <h2>Invites</h2>
                    <h6>Yes: {invite_info[3]}, Maybe: {invite_info[2]}, No: {invite_info[1]},
                        Awaiting: {invite_info[0]}</h6>
                    {event.invites.map(invite => (
                        <div key={invite.id} className={"card"}>
                            <div className={"card-body"}>
                                <p>
                                    {invite.user.name || invite.user.email}
                                    <br/>
                                    {invite_words[invite.status]}
                                </p>
                                <p>
                                    {invite.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                    {owner && <Container>
                        <div>Send an invite:</div>
                        <Form>
                            <Form.Group controlId={"formBasicEmail"}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control onChange={(event) => setNewInvite(event.target.value)} type="email"/>
                            </Form.Group>
                            <Button onClick={invite} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form></Container>}
                </div>
            </div>
        </Container>
    )
}

export default connect(({user_session}) => ({user_session}))(Event);
