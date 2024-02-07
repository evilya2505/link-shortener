// Функция для подсчета страниц
export function countPages(elementsPerPage: number, totalElements: number) {
    return Math.floor(totalElements / elementsPerPage);
}
