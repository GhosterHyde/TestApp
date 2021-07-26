import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserList from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/Layout';
import LeftMenu from './components/LeftMenu';

import './css/style.css';
import './fonts/Ubuntu/stylesheet.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Layout />
        <div id="screen">
            <LeftMenu />
            <UserList apiUrl="/users" />
        </div>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

