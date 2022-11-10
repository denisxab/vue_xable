<!-- 
    Нумерованные строки
-->
<template>
    <div class="vcode">
        <pre v-html="codeText"></pre>
    </div>
</template>
<script lang="ts">
// Для экранирования HTML
// @ts-ignore
String.prototype.escapeHtml = function () {
    var tagsToReplace = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
    };
    return this.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
};

export default {
    name: "vcode",
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
                let res = this.text
                    // Экранируем HTML
                    .escapeHtml()
                    // Обернуть переносы в тег code
                    .split("\n")
                    .map((i: string) => {
                        return `<code>${i}</code>`;
                    })
                    .join("\n");
                return res;
            }
            return "";
        },
    },
};
</script>
<style lang="scss">
.vcode {
    width: 100%;
    height: 100%;
    pre {
        color: v-bind(color); // #d8dee9;
        counter-reset: line;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        border: solid 1px v-bind(border); //#2e3440;
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
