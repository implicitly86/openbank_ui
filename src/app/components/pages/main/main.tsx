/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import { Button, Icon, Input, message, Table } from "antd";

import './main.css';
import { Navigation } from "../../elements/navigation/nav";
import { Constants } from "../../../constants/common_constants";
import { Account } from "../../../models/account";
import { httpClient } from "../../../utils/http_client";
import { Page } from "../../../models/page";
import { Api } from "../../../constants/api";
import { number } from "prop-types";

/**
 * Состояние компонента {@link Main}
 */
interface MainState {
    accounts: Array<Account>,
    createAccount: boolean,
    accountNumber: string
}

/**
 * Компонент, реализующий главную страницу приложения.
 *
 * @author Emil Murzakaev.
 */
export class Main extends React.Component<any, MainState> {

    /**
     * Конструктор.
     */
    constructor(props: any) {
        super(props);
        this.state = {
            accounts: [],
            createAccount: false,
            accountNumber: ''
        };
        this.loadAccounts();
    }

    /**
     * Загрузка счетов.
     */
    private loadAccounts() {
        httpClient.get<Page<Account>>(Api.ACCOUNT.BASE())
            .then(response => this.setState({
                accounts: response.data.content
            }))
            .catch(() => message.error('Произошла ошибка'));
    }

    /**
     * Удаление аккаунта по идентификатору.
     *
     * @param id идентификатор счета.
     */
    private deleteAccount(id: number) {
        httpClient.delete(Api.ACCOUNT.ACTION({id: id}))
            .then(() => this.loadAccounts())
            .catch(() => message.error('Произошла ошибка'));
    };

    /**
     * Создание нового аккаунта.
     */
    private createAccount() {
        let account = new Account(-1, this.state.accountNumber, '');
        httpClient.post(Api.ACCOUNT.BASE(), account)
            .then(() => {
                this.loadAccounts();
                this.setState({createAccount: false})
            })
            .catch(() => message.error('Произошла ошибка'));
    }

    /**
     * Функция рендеринга компонента.
     */
    render() {
        let columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Номер счета',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: 'Баланс',
                dataIndex: 'balance',
                key: 'balance'
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="danger" shape="circle" icon="delete" onClick={() => this.deleteAccount(record.id)}/>
                    </span>
                )
            }
        ];
        return (
            <div className="main">
                <Navigation index={Constants.PAGE_PATH.BASE.name}/>
                <div className="main_content">
                    <Table dataSource={this.state.accounts} columns={columns}/>
                    {this.state.createAccount &&
                        <Input.Group compact>
                            <Input
                                prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Номер карты"
                                onChange={(e) => this.setState({accountNumber: e.target.value })}
                                className="account_create"
                            />
                            <Button type="primary" icon="plus" onClick={() => this.createAccount()}>Добавить</Button>
                        </Input.Group>
                    }
                    {!this.state.createAccount &&
                        <Button type="primary" icon="plus" onClick={() => this.setState({createAccount: true})}>Добавить</Button>
                    }
                </div>
            </div>
        );
    }

}
