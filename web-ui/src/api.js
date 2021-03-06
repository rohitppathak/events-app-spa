import store from './store';

const SERVER = "http://events-spa.rohitpathak.us/api/v1";

export async function api_get(path) {
    let text = await fetch(SERVER + path, {});
    let resp = await text.json();
    return resp.data;
}

export function fetch_users() {
    api_get("/users").then((data) =>
        store.dispatch({
            type: 'users/set',
            data: data,
        })
    );
}

export async function get_event(id) {
    return api_get("/events/" + id);
}

export async function new_invite(email, event_id) {
    const token = store.getState().session && store.getState().session.token;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            // 'x-auth': token,
        },
        body: JSON.stringify({invite_params: {email, event_id}})
    };
    const text = await fetch(SERVER + "/invites", options);
    const result = await text.json();
    return result;
}

export async function new_user(user) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
    };
    const text = await fetch(SERVER + "/users", options);
    const result = await text.json();
    return result;
}

export async function update_user(user, user_id) {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: user_id, user})
    };
    const text = await fetch(SERVER + `/users/${user_id}`, options);
    const result = await text.json();
    return result;
}

export async function new_event(event) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event})
    };
    const text = await fetch(SERVER + "/events", options);
    const result = await text.json();
    return result;
}

export async function update_event(event, event_id) {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: event_id, event})
    };
    const text = await fetch(SERVER + `/events/${event_id}`, options);
    const result = await text.json();
    return result;
}

export async function update_invite(inviteId, status, comment) {
    const token = store.getState().session && store.getState().session.token;
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            // 'x-auth': token,
        },
        body: JSON.stringify({id: inviteId, invite_params: {status, comment}})
    };
    const text = await fetch(SERVER + `/invites/${inviteId}`, options);
    const result = await text.json();
    return result;
}

export async function login(email, password) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    };
    const text = await fetch(SERVER + "/session", options);
    const session = await text.json();
    if (session.user_id) {
        let action = {
            type: 'user_session/set',
            data: session
        };
        store.dispatch(action);
        await fetch_user(session.user_id);
    } else if (session.error) {
        let action = {
            type: 'error/set',
            data: session.error,
        };
        store.dispatch(action);
    }
}

export async function fetch_user(user_id) {
    const current_user_data = await api_get("/users/" + user_id);
    store.dispatch({
        type: 'logged_in_user/set',
        data: current_user_data,
    });
}



export function load_defaults() {
    fetch_users();
}
