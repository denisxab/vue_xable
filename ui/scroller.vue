<template>
    <div class="app">
        <div>!!!!!!</div>
        <button @click="hiddenTop">Скрыть вверху</button>
        <button @click="hiddenDown">Скрыть внизу</button>
        <button @click="showTop">Показать вверху</button>
        <button @click="showDown">Показать внизу</button>
        <div ref="box" class="box">
            <div
                ref="l_top"
                v-intersection="intersection_top"
                class="limit top item"
                @click="intersection_top"
            ></div>
            <div ref="items" class="items_list">
                <div class="item" v-for="(it, id) in files" :key="id">
                    {{ it }}
                </div>
            </div>
            <div
                ref="l_bottom"
                v-intersection="intersection_down"
                class="limit bottom item"
                @click="intersection_down"
            ></div>
        </div>
        <div>!!!!!!</div>
    </div>
</template>
<script lang="ts">
export default {
    // Компоненты
    components: {},
    // Аргументы
    //props: {},
    // Переменные
    data() {
        return {
            files: [
                "home",
                "home1",
                "home2",
                "home3",
                "home4",
                "home5",
                "home6",
                "home7",
                "home8",
                "home9",
                "home10",
                "home11",
                "etc",
                "etc1",
                "etc2",
                "etc3",
                "etc4",
                "etc5",
                "etc6",
                "etc7",
                "etc8",
                "etc9",
                "etc10",
                "etc11",
            ],
            // Сколько минерально показывать элементов
            min_visible: 10,
            // Сколько максимально показывать элементов
            max_visible: 11,
            next_visible: 1,
            //
            last_element: <HTMLElement>undefined,
            first_element: <HTMLElement>undefined,
            //
            down_visible_elm: <HTMLElement>undefined,
            top_visible_elm: <HTMLElement>undefined,
            //
            count_visible: <number>0,
        };
    },

    // Методы
    methods: {
        intersection_down() {
            console.log("Пересек Низ");
            // Показываем по одному элементу в низ
            for (let i = 0; i < this.next_visible; i++) {
                this.hiddenTop();
                this.showDown();
            }
        },
        intersection_top() {
            console.log("Пересек Верх");
            if (this.top_visible_elm != this.first_element) {
                const y = this.$refs.box.scrollTop;
                const x = this.$refs.box.scrollLeft;
                console.log(`${y}:${x}`);
                for (let i = 0; i < this.next_visible; i++) {
                    this.hiddenDown();
                    this.showTop();
                }
                this.$refs.box.scrollTo(x, y + this.top_visible_elm.offsetHeight);
            }
        },
        /*Показать элементы внизу*/
        showDown() {
            const c = this.checkCountVisibleFrom_Visible();
            console.log("showDown -" + c);
            if (c) {
                const tmp = this.down_visible_elm.nextElementSibling;
                if (tmp) {
                    if (!tmp.classList.contains("visible")) {
                        tmp.classList.add("visible");
                        this.count_visible += 1;
                        this.down_visible_elm = tmp;
                    }
                }
            }
        },
        /*Показать элементы вверху*/
        showTop() {
            const c = this.checkCountVisibleFrom_Visible();
            console.log("showTop -" + c);
            if (c) {
                const tmp = this.top_visible_elm.previousElementSibling;
                if (tmp) {
                    if (!tmp.classList.contains("visible")) {
                        tmp.classList.add("visible");
                        this.count_visible += 1;
                        this.top_visible_elm = tmp;
                    }
                }
            }
        },
        /*Скрыть элементы в верху*/
        hiddenDown() {
            const c = this.checkCountVisibleFrom_Hidden();
            console.log("hiddenDown -" + c);
            if (c) {
                if (this.down_visible_elm.classList.contains("visible")) {
                    this.down_visible_elm.classList.remove("visible");
                    this.count_visible -= 1;
                    this.down_visible_elm =
                        this.down_visible_elm.previousElementSibling;
                }
            }
        },
        /*Скрыть элементы в верху*/
        hiddenTop() {
            const c = this.checkCountVisibleFrom_Hidden();
            console.log("hiddenTop -" + c);
            if (c) {
                if (this.top_visible_elm.classList.contains("visible")) {
                    this.top_visible_elm.classList.remove("visible");
                    this.count_visible -= 1;
                    this.top_visible_elm =
                        this.top_visible_elm.nextElementSibling;
                }
            }
        },
        /*Проверить количество показанных элементов перед скрытия*/
        checkCountVisibleFrom_Hidden() {
            // Если пытаются скрыть элемент, когда и так количество показных элементом придельно минимально
            return this.count_visible - 1 < this.min_visible ? false : true;
        },
        /*Проверить количество показанных элементов перед новым показом*/
        checkCountVisibleFrom_Visible() {
            // Если пытаются показать элемент, когда и так количество показных элементом придельно максимально
            return this.count_visible + 1 > this.max_visible ? false : true;
        },

        addVisibleItem() {
            const items = this.$refs.items;
            // Первый элемент из списка
            this.first_element = items.childNodes[1];
            // Последний элемент из списка
            this.last_element = items.childNodes[items.childNodes.length - 1];
            // Начальная позиция
            this.down_visible_elm = items.childNodes[0];
            this.top_visible_elm = items.childNodes[0].nextElementSibling;
            console.log();
            for (let i = 0; i < this.max_visible; i++) {
                this.showDown();
            }
        },
    },
    mounted() {
        this.addVisibleItem();
        if (this.min_visible >= this.max_visible) {
            throw Error("Минимум больше Максимума");
        }
    },
    computed: {},
};
</script>
<style lang="scss">
@import "wbs/vue/gcolor.scss";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    background: $ЦветФона;
    height: 100vh;
    width: 100vw;
    .box {
        width: 100%;
        height: 500px;
        overflow: auto;
        // scroll-margin-top: 100px;
        border: 1px solid aqua;
        .limit {
            display: block;
            margin: auto;

            &.top {
                // background: aqua;
            }
            &.bottom {
                // background: yellow;
            }
        }
        .items_list {
            color: ghostwhite;
            padding: 8px;
            width: 100%;
        }
    }
}
.item {
    height: 100px;
    width: 100%;
    padding: 8px;
    border: 1px solid wheat;
    text-align: center;
    display: none;
    &.visible {
        display: block;
    }
}
</style>
