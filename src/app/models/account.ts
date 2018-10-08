/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Сущность "Банковский счет".
 *
 * @author Emil Murzakaev.
 */
export class Account {

    /**
     * Уникальный идентификатор.
     */
    readonly id: number;

    /**
     * Номер счета.
     */
    readonly number: string;

    /**
     * Баланс.
     */
    readonly balance: string;

    /**
     * Конструктор.
     */
    constructor(id: number = -1, number: string = '', balance: string = '') {
        this.id = id;
        this.number = number;
        this.balance = balance;
    }

}
