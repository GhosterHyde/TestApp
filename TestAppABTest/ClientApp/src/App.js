import React from 'react';
import User from './components/User';
import Selector from './components/Selector';
import Graph from './components/Graph';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.onAddUser = this.onAddUser.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ users: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onAddUser(user) {
        if (user) {
            const data = new FormData();
            data.append("registrationDate", user.registrationDate);
            data.append("lastActivityDate", user.lastActivityDate);
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    onChangeUser(user) {
        if (user) {
            var url = this.props.apiUrl + "/" + user.id;
            const data = new FormData();
            data.append("id", user.id);
            data.append("registrationDate", user.registrationDate);
            data.append("lastActivityDate", user.lastActivityDate);
            var xhr = new XMLHttpRequest();
            xhr.open("put", url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    onRemoveUser(user) {
        if (user) {
            var url = this.props.apiUrl + "/" + user.id;
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
            var userMentions = document.getElementsByName("user"+user.id);
            userMentions.forEach(mention => mention.parentNode.removeChild(mention));
        }
    }

    render() {
        var remove = this.onRemoveUser;
        return (
            <div id="main-content">
                <Selector onUserSubmit={this.onAddUser} onUserChange={this.onChangeUser} Users={this.state.users} />
                <Graph Users={this.state.users} />
                <p id="tableNaming">User List</p>
                <table id="usersTable">
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>Date Registration</td>
                            <td>Date Last Activity</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    {
                        this.state.users.map(function (user) {
                            return <User key={user.id} user={user} onRemove={remove} />
                        })
                    }
                </table>
            </div>
        );
    }
}
