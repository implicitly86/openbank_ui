/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Модель таблицы ключ-значение.
 */
declare interface HashMap<T = any> {
    [key: string]: T;
}

/**
 * Модель-обертка, используемая в качестве ответа сервера при запросе данных в формате страницы.
 *
 * @author Emil Murzakaev.
 */
export class Page<T> {

    /**
     * Содержимое страницы.
     */
    readonly content: Array<T>;
    /**
     * Количество страниц.
     */
    readonly totalPages: number;
    /**
     * Количество элементов.
     */
    readonly totalElements: number;
    /**
     * Признак последнего элемента.
     */
    readonly last: boolean;
    /**
     * Сортировка.
     */
    readonly sort: HashMap;
    /**
     * Количество элементов на странице.
     */
    readonly numberOfElements: number;
    /**
     * Признак первого элемента.
     */
    readonly first: boolean;
    /**
     * Запрошенное количество элементов.
     */
    readonly size: number;
    /**
     * Номер страницы.
     */
    readonly number: number;

    /**
     * Конструктор.
     *
     * @param content содержимое страницы.
     * @param totalPages количество страниц.
     * @param totalElements количество элементов.
     * @param last признак последнего элемента.
     * @param sort сортировка.
     * @param numberOfElements количество элементов на странице.
     * @param first признак первого элемента.
     * @param size запрошенное количество элементов.
     * @param number номер страницы.
     */
    constructor(
        content: Array<T>,
        totalPages: number,
        totalElements: number,
        last: boolean,
        sort: HashMap,
        numberOfElements: number,
        first: boolean,
        size: number,
        number: number
    ) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.last = last;
        this.sort = sort;
        this.numberOfElements = numberOfElements;
        this.first = first;
        this.size = size;
        this.number = number;
    }

}
