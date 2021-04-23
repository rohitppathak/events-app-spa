import { createStore, combineReducers } from 'redux';

function users(state = [], action) {
    switch (action.type) {
        case 'users/set':
            return action.data;
        default:
            return state;
    }
}

function user_form(state = {}, action) {
    switch (action.type) {
        case 'user_form/set':
            return action.data;
        default:
            return state
    }
}

function get_current_session() {
    let user_session = localStorage.getItem("user_session");
    if (!user_session) return null;
    user_session = JSON.parse(user_session);
    let age = Date.now() - user_session.time;
    let hours = 60 * 60 * 1000;
    if (age < 24 * hours) {
        return user_session;
    }
    else {
        return null;
    }
}

function user_session(state = get_current_session(), action) {
    switch (action.type) {
        case 'user_session/set':
            const user_session = Object.assign({}, action.data, {time: Date.now()});
            localStorage.setItem("user_session", JSON.stringify(user_session));
            return action.data;
        case 'user_session/clear':
            localStorage.removeItem("user_session");
            return null;
        default:
            return state;
    }
}

function logged_in_user(state = null, action) {
    switch (action.type) {
        case 'logged_in_user/set':
            return action.data;
        case 'logged_in_user/clear':
            return null;
        default:
            return state;
    }
}

function root_reducer(state, action) {
    let reducer = combineReducers({
        users, user_form, user_session, logged_in_user, error
    });
    return reducer(state, action);
}

function error(state = null, action) {
    switch (action.type) {
        case 'error/clear':
            return null;
        case 'error/set':
            setTimeout(() => store.dispatch({type: "error/clear"}), 3000);
            return action.data;
        default:
            return state;
    }
}

let store = createStore(root_reducer);
export default store;
