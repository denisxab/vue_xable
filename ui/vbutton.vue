<template>
    <button>
        <slot></slot>
    </button>
</template>
<script lang="ts">
export default {
    name:'vbutton',
    // Переменные
    data() {
        return {
            // ИмяПеременной: ЗначениеПоУмолчанию,
        };
    },
    // Методы
    methods: {},
};
</script>
<style lang="scss" scoped>
@import "wbs/vue/gcolor.scss";

button {
    margin-left: 4px;
    background: $ЦветФонаПодсказки;
    border-radius: 5px;
    color: $БазовыйЦветТекста;
    padding: 4px;
    display: inline-block;
    border: none;
    &:hover {
        box-shadow: inset 0 0 10px 1px #000;
    }
}
</style>
