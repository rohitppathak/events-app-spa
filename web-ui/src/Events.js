import {Container, Card, CardColumns} from 'react-bootstrap'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

function Events({logged_in_user}) {
    let data = null;
    if (logged_in_user) {
        const owner_events = logged_in_user.events.map(event => (
            <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.owner.name}</td>
                <td>
                    <Link to={"/events/" + event.id}>View</Link>
                </td>
            </tr>
        ));
        const invite_events = logged_in_user.invites.map(event => (
            <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.owner.name}</td>
                <td>
                    <Link to={"/events/" + event.id}>View</Link>
                </td>
            </tr>
        ));
        data = (
            <>
                <Link to="/events/new">
                    Create Event
                </Link>
                <h2>Your Events</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { owner_events }
                    </tbody>
                </table>

                <h2>Your Invites</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { invite_events }
                    </tbody>
                </table>
            </>

        );
    }
    else data = <h1>Must be logged in to view.</h1>;

    return(<Container>
        {data}
    </Container>)

}

export default connect(({logged_in_user})=>({logged_in_user}))(Events);
