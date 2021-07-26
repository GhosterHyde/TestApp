import React from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.Users,
            myChart: null,
            rollingRetentionDays: 7
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.ShowGraph();
        var liveDays = this.CountLiveDays();
        this.CountAndShowRollingRetention(liveDays);
        const barGraph = document.getElementById("barGraph");
        var ctx = barGraph.getContext('2d');
        this.ClearAndDrawNewChart(ctx, liveDays);
    }

    ShowGraph() {
        const barGraphContainer = document.getElementById("barGraphContainer");
        barGraphContainer.hidden = false;
    }

    CountLiveDays() {
        var liveDays = {};
        this.props.Users.forEach((user) => {
            var lastActDate = new Date(user.lastActivityDate);
            var regDate = new Date(user.registrationDate);
            var userLiveDays = Math.round((lastActDate.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
            if (!(userLiveDays in liveDays)) {
                liveDays[userLiveDays] = 1;
            } else {
                liveDays[userLiveDays]++;
            }
        });
        return liveDays;
    }

    CountAndShowRollingRetention(liveDays) {
        var rollingRetentionXDays = this.rollingRetention(liveDays, this.state.rollingRetentionDays)
        const rollingRetentionHTML = document.getElementById("rollingRetention");
        if (!isNaN(rollingRetentionXDays)) {
            rollingRetentionHTML.innerHTML = "Rolling Retention " + this.state.rollingRetentionDays + " Days = " + rollingRetentionXDays + "%";
        } else {
            rollingRetentionHTML.innerHTML = "Please, add at least 1 user to recieve metrics!";
        }
    }

    rollingRetention(liveDays, days) {
        var emountOfReturnedUsers = this.CountEmountOfReturnedUsers(liveDays, days);
        var oldUsersBasedOnDays = this.CountOldUsers(days);
        var rollingRetentionXDays = emountOfReturnedUsers / oldUsersBasedOnDays * 100;
        return Math.round(rollingRetentionXDays, 2);
    }

    CountEmountOfReturnedUsers(liveDays, days) {
        var emountOfReturnedUsers = 0;
        Object.keys(liveDays).map(function (key) {
            if (key >= days) {
                emountOfReturnedUsers += liveDays[key];
            }
        });
        return emountOfReturnedUsers;
    }

    CountOldUsers(days) {
        var oldUsersBasedOnDays = 0;
        this.props.Users.forEach((user) => {
            var today = new Date();
            var regDate = new Date(user.registrationDate);
            var userRegisterDaysAgo = Math.round((today.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
            if (userRegisterDaysAgo >= days) {
                oldUsersBasedOnDays++;
            }
        });
        return oldUsersBasedOnDays;
    }

    ClearAndDrawNewChart(ctx, data) {
        if (this.state.myChart != null) {
            this.state.myChart.destroy();
        }
        var dataValues = this.GetValuesCollection(data);
        this.setState({
            myChart: new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Users lived',
                        data: dataValues,
                        backgroundColor: [
                            'rgba(93, 110, 151, 1)'
                        ],
                        borderColor: [
                            'rgba(93, 110, 151, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Users"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Days Alive"
                            }
                        }
                    }
                }
            })
        });
    }

    GetValuesCollection(data) {
        var values = Object.keys(data).map(function (key) {
            return data[key];
        });
        return values;
    }

    render() {
        return (
            <div>
                <button id="calculateButton" onClick={this.onClick}>Calculate</button>
                <p id="rollingRetention"></p>
                <div id="barGraphContainer" className="chart-container" hidden>
                    <canvas id="barGraph"></canvas>
                </div>
            </div>
        );
    }
}