/*
    Обработка нажатий клавиш на элементе
    :
    :
    <div v-keydown="ФункцияОбработчик">
*/

interface Tbinding {
    value: (target: HTMLElement, event_key: KeyboardEvent) => any;
}
const keyListener = (binding: Tbinding, e: KeyboardEvent) => {
    const e_target = <HTMLElement>e.target;
    if (!e_target) return null;
    binding.value(e_target, e);
};
export default {
    name: "keydown",
    /*Добавляем обработчик нажатий клавиш*/
    mounted(elm: HTMLElement, binding: Tbinding) {
        // Список всех клавиш - https://snipp.ru/handbk/js-kbd-codes
        elm.addEventListener("keydown", (e: KeyboardEvent) => {
            keyListener(binding, e);
        });
    },
    /* Удаляем обработчик после уничтожения компонента */
    beforeDestroy(elm: HTMLElement, binding: Tbinding) {
        elm.removeEventListener("keydown", (e: KeyboardEvent) => {
            keyListener(binding, e);
        });
    },
};
