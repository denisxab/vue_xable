<!-- 
    Нумерованные строки
-->
<template>
    <div class="vcode">
        <pre v-html="codeText" :style="cssProps"></pre>
    </div>
</template>
<script lang="ts">
export default {
    name:'vcode',
    // Компоненты
    components: {},
    // Аргументы
    props: {
        text: String,
        color: {
            type: String,
            default: () => "#000",
        },
        border: {
            type: String,
            default: () => "#000",
        },
    },
    computed: {
        codeText() {
            if (this.text) {
                const res = this.text
                    .split("\n")
                    .map((i: string) => {
                        return `<code>${i}</code>`;
                    })
                    .join("\n");
                return res;
            }
            return "";
        },
        cssProps() {
            return {
                "--border": this.border,
                "--color": this.color,
            };
        },
    },
    // Методы
    methods: {},
};
</script>
<style lang="scss">
.vcode {
    width: 100%;
    height: 100%;
    pre {
        color: var(--color); // #d8dee9;
        counter-reset: line;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        border: solid 1px var(--border); //#2e3440;
        overflow: auto;
        font-size: 1.2em;
        code {
            counter-increment: line;
            &:before {
                content: counter(line);
                display: inline-block;
                width: 1.5em;
                border-right: 1px solid #ebcb8b;
                padding: 0 0.5em;
                margin-right: 0.5em;
                background: #2e3440;
                -webkit-user-select: none;
            }
        }
    }
}
</style>
