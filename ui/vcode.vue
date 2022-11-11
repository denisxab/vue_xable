<!-- 
    Нумерованные строки. 
    
    Использует RecycleScroller
    https://github.com/Akryum/vue-virtual-scroller
-->
<template>
    <div class="vcode">
        <pre><RecycleScroller class="scroller" :items="ArrayText" key-field="i" :item-size="20" :gridItems="20" :buffer="200" v-slot="{ item, index }"><line><span class="n">{{ item.i }}</span><span>{{ item.n }}</span></line></RecycleScroller></pre>
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

let Genirator = 0;

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
        ArrayText(): string[] | undefined {
            if (this.text) {
                return (
                    this.text
                        // Экранируем HTML
                        .escapeHtml()
                        // Обернуть переносы в тег code
                        .split("\n")
                        .map((i: string, index: number) => {
                            Genirator += 1;
                            return { n: `${i}\n`, i: index + 1 };
                        })
                    // .join("\n")
                );
            }
            return [];
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
        .scroller {
            height: 100%;
            line {
                // counter-increment: line;
                .n {
                    width: 3.4em;
                    display: inline-block;
                    border-right: 1px solid #ebcb8b;
                    padding: 0 0.5em;
                    margin-right: 0.5em;
                    background: #2e3440;
                    -webkit-user-select: none;
                    text-align: right;
                }
            }
        }
    }
}
</style>
