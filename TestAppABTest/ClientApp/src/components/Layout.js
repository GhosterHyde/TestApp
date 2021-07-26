import React from "react";
import searchButton from '../img/search-UX.png';
import enterButton from '../img/enter-UX.png';
import avatar from '../img/avatar.jpg';

export default class Layout extends React.Component {
    render() {
        return (
            <div id="header">
                <span id="company-naming">AB TEST REAL</span>
                <div className="has-search" id="search-input">
                    <img id="UX-element" className="searchButton" src={searchButton} alt="search-button" />
                    <input type="text" className="form-control" />
                </div>
                <div className="avatarBorder" >
                    <img id="avatar" src={avatar} alt="avatar" />
                </div>
                <img id="UX-element" className="enterButton" src={enterButton} alt="enter-button" />
            </div>
        );
    }
}