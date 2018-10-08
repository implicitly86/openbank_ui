/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { App } from "./components/app";
import { Constants } from "./constants/common_constants";
import { httpClient } from "./utils/http_client";

if (localStorage.getItem(Constants.AUTH.TOKEN_NAME) != null) {
    httpClient.defaults.headers.common[Constants.AUTH.HEADER_NAME] = Constants.AUTH.HEADER_PREFIX + " " + localStorage.getItem(Constants.AUTH.TOKEN_NAME);
}

ReactDOM.render(<App/>, document.getElementById('root'));