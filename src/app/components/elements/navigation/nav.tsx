/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Icon, Menu } from "antd";

import "./nav.css";
import { Constants } from "../../../constants/common_constants";
import { history } from "../../../utils/history";

/**
 * Свойства компонента {@link Navigation}.
 */
interface NavigationProps {
    index: string;
}

/**
 * Компонент, реализующий навигацию в приложении.
 *
 * @author Emil Murzakaev.
 */
export class Navigation extends React.Component<NavigationProps, any> {

    /**
     * Обработка нажатия.
     */
    private handleClick = (e) => {
        if (e.key === 'logout') {
            localStorage.removeItem(Constants.AUTH.TOKEN_NAME);
            history.push(Constants.PAGE_PATH.LOGIN.path);
        }
    };

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <Menu selectedKeys={[this.props.index]} mode="horizontal" onClick={this.handleClick} className="navigation">
                <Menu.Item key={Constants.PAGE_PATH.BASE.name}>
                    <Link to={Constants.PAGE_PATH.BASE.path}>
                        <Icon type="credit-card" />Мои счета
                    </Link>
                </Menu.Item>
                <Menu.Item key={Constants.PAGE_PATH.TRANSFER.name}>
                    <Link to={Constants.PAGE_PATH.TRANSFER.path}>
                        <Icon type="retweet" theme="outlined" />Переводы
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout" className="last_item">
                    <Icon type="logout" theme="outlined" />Выход
                </Menu.Item>
            </Menu>
        );
    }

}
