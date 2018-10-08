/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";

import "./transfer.css";
import { Navigation } from "../../elements/navigation/nav";
import { Constants } from "../../../constants/common_constants";
import { Button, Input, message, Select, Steps } from "antd";
import { Api } from "../../../constants/api";
import { httpClient } from "../../../utils/http_client";
import { Account } from "../../../models/account";
import { Page } from "../../../models/page";
import { SelectValue } from "antd/es/select";
import { number } from "prop-types";

/**
 * Состояние компонента {@link Transfer}
 */
interface TransferState {
    currentStep: number;
    accounts: Array<Account>;
    accountFrom: string;
    accountTo: string;
    amount: number;
}

/**
 * Компонент, реализующий страницу переводов.
 *
 * @author Emil Murzakaev.
 */
export class Transfer extends React.Component<any, TransferState> {

    /**
     * Конструктор.
     */
    constructor(props: any) {
        super(props);
        this.state = {
            currentStep: 0,
            accounts: [],
            accountFrom: '',
            accountTo: '',
            amount: 0
        };
        this.loadAccounts();
    }

    /**
     * Загрузка счетов.
     */
    private loadAccounts() {
        httpClient.get<Page<Account>>(Api.ACCOUNT.BASE())
            .then(response => this.setState({accounts: response.data.content}))
            .catch(() => message.error('Произошла ошибка'));
    }

    /**
     * Перевод денежных средств.
     */
    private transfer() {
        httpClient.post(Api.ACCOUNT.TRANSFER(), {
            from: this.state.accountFrom,
            to: this.state.accountTo,
            amount: this.state.amount
        })
            .then(() => {
                message.success('Перевод осуществлен!');
                this.setState({currentStep: this.state.currentStep + 1})
            })
            .catch(() => message.error('Произошла ошибка'));
    }

    /**
     * Функция рендеринга компонента.
     */
    render() {
        let steps = [
            {
                title: 'Выбор счета',
                content:
                    <div>
                        <p className="transfer__p">
                            Выберите счет списания
                        </p>
                        <Select
                            value={this.state.accountFrom}
                            style={{ width: 300 }}
                            onChange={(value) => this.setState({accountFrom: value.toString()})}
                        >
                            {this.state.accounts.map(it => <Select.Option value={it.number}>{it.number} ({it.balance})</Select.Option>)}
                        </Select>
                    </div>
            },
            {
                title: 'Зачисление на счет',
                content:
                    <div>
                        <p className="transfer__p">
                            Выберите счет зачисления
                        </p>
                        <Select
                            value={this.state.accountTo}
                            style={{ width: 300 }}
                            onChange={(value) => this.setState({accountTo: value.toString()})}
                        >
                            {this.state.accounts.map(it => <Select.Option value={it.number}>{it.number} ({it.balance})</Select.Option>)}
                        </Select>
                        <p className="transfer__p">
                            Или введите номер счета получателя
                        </p>
                        <Input placeholder="Счет зачисления" onChange={(e) => this.setState({accountTo: e.target.value})}/>
                    </div>
            },
            {
                title: 'Перевод',
                content:
                    <div>
                        <div className="transfer__summary_from">
                            Номер счета, с которого будут списаны средства: {this.state.accountFrom}
                        </div>
                        <div className="transfer__summary_to">
                            Номер счета, на который будут зачислены средства: {this.state.accountTo}
                        </div>
                        <div className="transfer__summary_amount">
                            <Input placeholder="Сумма" onChange={(e) => this.setState({amount: parseFloat(e.target.value)})}/>
                        </div>
                    </div>
            },
            {
                title: 'Чек',
                content:
                    <div>
                        <div className="transfer__summary_from">
                            Номер счета, с которого были списаны средства: {this.state.accountFrom}
                        </div>
                        <div className="transfer__summary_to">
                            Номер счета, на который были зачислены средства: {this.state.accountTo}
                        </div>
                        <div className="transfer__summary_amount">
                            Сумма: {this.state.amount}
                        </div>
                    </div>
            }
        ];
        let current = this.state.currentStep;
        return (
            <div className="transfer">
                <Navigation index={Constants.PAGE_PATH.TRANSFER.name}/>
                <div className="transfer_content">
                    <Steps current={current}>
                        {steps.map(it => <Steps.Step key={it.title} title={it.title} />)}
                    </Steps>
                    <div className="transfer_steps-content">{steps[this.state.currentStep].content}</div>
                    <div className="transfer_steps-action">
                    {current < steps.length - 2 &&
                        <Button type="primary" onClick={() => this.setState({currentStep: current + 1})}>Далее</Button>
                    }
                    {current === steps.length - 2 &&
                        <Button type="primary" onClick={() => this.transfer()}>Перевести</Button>
                    }
                    {current > 0 && current < steps.length - 1 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.setState({currentStep: current - 1})}>Назад</Button>
                    )}
                    </div>
                </div>
            </div>
        );
    }

}
