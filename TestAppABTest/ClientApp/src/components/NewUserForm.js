import React from 'react';

export default class NewUserForm extends React.Component {
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

    onSubmit(e) {
        e.preventDefault();
        var userRegDate = this.state.registrationDate;
        var userLastDate = this.state.lastActivityDate;
        if (userRegDate > userLastDate) {
            alert("Registration Date cannot be later then Last Activity Date!");
            return;
        }
        this.props.onUserSubmit({ registrationDate: userRegDate, lastActivityDate: userLastDate });
        let today = new Date().toISOString().slice(0, 10);
        this.setState({
            registrationDate: today,
            lastActivityDate: today
        });
    }

    render() {
        return (
            <form id="userForm" onSubmit={this.onSubmit}>
                <p>
                    <label htmlFor="regDate">Registration Date</label>
                    <input id="regDate"
                        type="date"
                        value={this.state.registrationDate}
                        onChange={this.onRegistrationDateChange} />
                </p>
                <p>
                    <label htmlFor="lastActDate">Last Activity Date</label>
                    <input id="lastActDate"
                        type="date"
                        value={this.state.lastActivityDate}
                        onChange={this.onLastActivityDateChange} />
                </p>
                <div className="submitButton">
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }
}