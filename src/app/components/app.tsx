/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import { Router, Route, Link } from 'react-router-dom'

import { history } from '../utils/history';
import { Constants } from "../constants/common_constants";
import { Login } from "./pages/login/login";
import { Main } from "./pages/main/main";
import { Transfer } from "./pages/transfer/transfer";

/**
 * Компонент приложения.
 *
 * @author Emil Murzakaev.
 */
export class App extends React.Component<any, any> {

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path={Constants.PAGE_PATH.BASE.path} component={Main}/>
                    <Route path={Constants.PAGE_PATH.LOGIN.path} component={Login} />
                    <Route path={Constants.PAGE_PATH.TRANSFER.path} component={Transfer} />
                </div>
            </Router>
        );
    }

}
