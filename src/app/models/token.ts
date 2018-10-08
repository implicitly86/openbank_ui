/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * JWT токен.
 *
 * @author Emil Murzakaev.
 */
export class Token {

    /**
     * Токен в виде строки.
     */
    readonly access_token: string;

    /**
     * Конструктор.
     */
    constructor(access_token: string = "") {
        this.access_token = access_token;
    }

}
