import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import {Link} from "react-router-dom";

function Users({users, logged_in_user}) {

    let rows = users.map((user) => (
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {logged_in_user.id === user.id && <Link to={`/users/${user.id}/edit`}>Edit</Link>}
            </td>
        </tr>
    ));

    return (
        <div>
            <Row>
                <Col>
                    <h2>List Users</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
}

export default connect(({users, logged_in_user}) => ({users, logged_in_user}))(Users);
