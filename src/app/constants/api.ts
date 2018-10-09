/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Идентификатор, используемый в запросах.
 */
interface IApiAction {
    id: number;
}

/**
 * Параметры запроса, используемые при запросе данных в страничном виде.
 */
interface IApiParameters {
    size?: number;
    page?: number;
    sort?: string;
}

/**
 * API серверной части приложения.
 */
export const Api = {
    BASE: (url: string, params?: IApiParameters) => `${url}${params ? `?size=${params.size ? params.size : ``}&page=${params.page ? params.page : ``}&sort=${params.sort ? params.sort : `id,asc`}` : ``}`,
    LOGIN: () => `/login`,
    ACCOUNT: {
        BASE: (params?: IApiParameters, nextUrl?: string) => Api.BASE(`/account${nextUrl ? nextUrl : ``}`, params),
        ACTION: (params: IApiAction) => `${Api.ACCOUNT.BASE()}/${params.id}`,
        TRANSFER: () => Api.ACCOUNT.BASE(undefined, `/transfer`),
        ADD_AMOUNT: () => Api.ACCOUNT.BASE(undefined, `/add-amount`),
        SUBTRACT_AMOUNT: () => Api.ACCOUNT.BASE(undefined, `/subtract-amount`)
    }
};
