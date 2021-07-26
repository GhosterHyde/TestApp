import React from "react";
import ReactDOM from 'react-dom';
import NewUserForm from "./NewUserForm";
import UserChangeForm from "./UserChangeForm";

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        var index = event.target.selectedIndex;
        var content = document.getElementById("inner");
        if (index === 0) {
            ReactDOM.render(
                <NewUserForm onUserSubmit={this.props.onUserSubmit} />,
                content
            );
        } else {
            ReactDOM.render(
                <UserChangeForm onUserChange={this.props.onUserChange} Users={this.props.Users} />,
                content
            );
        }
    }

    render() {
        return (
            <div>
                <select id="mainSelector" onChange={this.onChange}>
                    <option>Add New User</option>
                    <option>Change User</option>
                </select>
                <div id="inner">
                    <NewUserForm onUserSubmit={this.props.onUserSubmit} />
                </div>
            </div>
        );
    }
}