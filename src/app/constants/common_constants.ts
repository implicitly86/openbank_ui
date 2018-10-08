/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Константы, используемые в приложении.
 */
export const Constants = {
    PAGE_SIZE: 10,
    PAGE_PATH: {
        BASE: {path: '/', name: 'main', title: 'Мои счета'},
        LOGIN: {path: '/login', name: 'login', title: 'Вход'},
        TRANSFER: {path: '/transfer', name: 'transfer', title: 'Переводы'}
    },
    AUTH: {
        TOKEN_NAME: 'id_token',
        HEADER_NAME: 'Authorization',
        HEADER_PREFIX: 'Bearer'
    }
};
