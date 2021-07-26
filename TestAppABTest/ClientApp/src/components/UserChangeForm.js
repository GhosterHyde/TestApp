import React from "react";

export default class UserChangeForm extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date().toISOString().slice(0, 10);
        this.state = {
            registrationDate: today,
            lastActivityDate: today
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onRegistrationDateChange = this.onRegistrationDateChange.bind(this);
        this.onLastActivityDateChange = this.onLastActivityDateChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString().slice(0, 10);
    }

    onRegistrationDateChange(e) {
        this.setState({
            registrationDate: e.target.value
        });
    }

    onLastActivityDateChange(e) {
        this.setState({
            lastActivityDate: e.target.value
        });
    }

    onChange(event) {
        var regDateInput = document.getElementById("regDate");
        var lastActDateInput = document.getElementById("lastActDate");
        var saveButton = document.getElementById("saveButton");
        if (event.target.selectedIndex === 0) {
            regDateInput.disabled = "true";
            lastActDateInput.disabled = "true";
            saveButton.disabled = "true";
        }
        else {
            regDateInput.disabled = false;
            lastActDateInput.disabled = false;
            saveButton.disabled = false;
            var user = this.props.Users.find(user => user.id === +event.target.value);
            var regDate = this.formatDate(user.registrationDate);
            regDateInput.value = regDate;
            var lastActDate = this.formatDate(user.lastActivityDate);
            lastActDateInput.value = lastActDate;
        }
    }

    onSubmit(e) {
        e.preventDefault();
        var userId = +document.getElementById("userId").value;
        var userRegDate = this.state.registrationDate;
        var userLastDate = this.state.lastActivityDate;
        if (userRegDate > userLastDate) {
            alert("Registration Date cannot be later then Last Activity Date!");
            return;
        }
        this.props.onUserChange({ id: userId, registrationDate: userRegDate, lastActivityDate: userLastDate });
        const regDateCell = document.getElementById("user" + userId + "regDate");
        regDateCell.innerHTML = new Date(userRegDate).toLocaleDateString();
        const lastActDateCell = document.getElementById("user" + userId + "lastActDate");
        lastActDateCell.innerHTML = new Date(userLastDate).toLocaleDateString();
    }

    render() {
        return (
            <form id="userForm" onSubmit={this.onSubmit}>
                <p>
                    <label htmlFor="userId">Select User's ID</label>
                    <select id="userId" onChange={this.onChange}>
                        <option hidden>User ID</option>
                        {
                            this.props.Users.map(function (user) {
                                const name = "user" + user.id;
                                return <option name={name} key={user.id} user={user}>{user.id}</option>
                            })
                        }
                    </select>
                </p>
                <p>
                    <label htmlFor="regDate">Registration Date</label>
                    <input id="regDate"
                        disabled={true}
                        type="date"
                        value={this.state.registrationDate}
                        onChange={this.onRegistrationDateChange} />
                </p>
                <p>
                    <label htmlFor="lastActDate">Last Activity Date</label>
                    <input id="lastActDate"
                        disabled={true}
                        type="date"
                        value={this.state.lastActivityDate}
                        onChange={this.onLastActivityDateChange} />
                </p>
                <div className="submitButton">
                    <input id="saveButton" type="submit" value="Save" disabled={true} />
                </div>
            </form>
        );
    }
}