import React from "react";
import recycleBin from '../img/recycle-bin.png';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.user };
        this.onClick = this.onClick.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    onClick(e) {
        this.props.onRemove(this.state.data);
        var regDateInput = document.getElementById("regDate");
        var lastActDateInput = document.getElementById("lastActDate");
        var saveButton = document.getElementById("saveButton");
        if (saveButton != null) {
            regDateInput.disabled = "true";
            lastActDateInput.disabled = "true";
            saveButton.disabled = "true";
        }
    }

    render() {
        const thisUser = "user" + this.state.data.id;
        const regDateID = thisUser + "regDate";
        const lastActDateID = thisUser + "lastActDate";
        return <tbody>
            <tr>
                <td>{this.state.data.id}</td>
                <td id={regDateID}>{this.formatDate(this.state.data.registrationDate)}</td>
                <td id={lastActDateID}>{this.formatDate(this.state.data.lastActivityDate)}</td>
                <td>
                    <button className="deleteButton" onClick={this.onClick}>
                        <img className="bin" src={recycleBin} alt="delete" />
                    </button>
                </td>
            </tr>
        </tbody>;
    }

    formatDate(date) {
        var newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
}