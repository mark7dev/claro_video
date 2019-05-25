import React, { Component } from 'react';
import './Styles/Header.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/">
                    <img src="https://www.clarovideo.com/webclient/sk_core/images/clarovideo-logo-sitio.svg" alt="" id='logo'/>
                </Link>
            </div>
        )
    }
}
