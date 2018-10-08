/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import { Button, Icon, Input, message } from "antd";
import { withRouter } from 'react-router-dom'

import './login.css';
import { httpClient } from "../../../utils/http_client";
import { Constants } from "../../../constants/common_constants";
import { Api } from "../../../constants/api";
import { Token } from "../../../models/token";

/**
 * Состояние компонента {@link Login}
 */
interface LoginState {
    userName: string;
    password: string;
}

/**
 * Компонент, реализующий страницу входа в систему.
 *
 * @author Emil Murzakaev.
 */
export class Login extends React.Component<any, LoginState> {

    /**
     * Конструктор.
     */
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }

    /**
     * Метод обрабатывающий собитие изменения поля имя пользователя.
     */
    private onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    /**
     * Метод обрабатывающий собитие изменения поля пароль.
     */
    private onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    /**
     * Метод аутентификации пользователя.
     */
    private authenticate = () => {
        httpClient.post<Token>(Api.LOGIN(), {
            username: this.state.userName,
            password: this.state.password
        }).then(response => {
            // Loading.close();
            localStorage.setItem(Constants.AUTH.TOKEN_NAME, response.data.access_token);
            httpClient.defaults.headers.common[Constants.AUTH.HEADER_NAME] = Constants.AUTH.HEADER_PREFIX + " " + response.data.access_token;
            let redirect = this.props.location.search.redirect;
            if (redirect !== undefined) {
                this.props.history.push(redirect);
            } else {
                this.props.history.push(Constants.PAGE_PATH.BASE.path);
            }
        })
        .catch(() => message.error('Неверный логин / пароль'));
    };

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Имя пользователя"
                            onChange={this.onChangeUserName}
                            className="custom_input"
                            id="login"
                        />
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Пароль"
                            onChange={this.onChangePassword}
                            className="custom_input"
                            type="password"
                            id="password"
                        />
                        <Button type="primary" onClick={this.authenticate} className="custom_input">
                            Вход
                        </Button>
                        <p className="message"><a href="#">Забыли пароль?</a></p>
                    </form>
                </div>
            </div>
        );
    }

}
