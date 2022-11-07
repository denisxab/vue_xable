<template>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :style="cssProps"
    ></textarea>
</template>
<script lang="ts">
export default {
    name:'vtextarea',

    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: () => "....",
        },
        background: {
            type: String,
            default: () => "#000",
        },
        color: {
            type: String,
            default: () => "#000",
        },
    },
    computed: {
        cssProps() {
            return {
                "--Фон": this.background,
                "--color": this.color,
            };
        },
    },
};
</script>
<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 100%;
    resize: none;
    background: var(--Фон);
    border: none;
    color: var(--color);
    font-size: medium;
    padding: 10px;
    border-radius: 8px;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
</style>
