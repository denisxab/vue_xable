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
            // Сколько минерально отображать элементов
            min_visible: 10,
            // Сколько максимально отображать элементов
            max_visible: 11,
            // Сколько отображать(и скрывать) при достижения края
            next_visible: 1,
            //
            // Системный
            //
            // Последний элемент в списке(не важно видимый или нет)
            last_element: <HTMLElement>undefined,
            // Первый элемент в списке(не важно видимый или нет)
            first_element: <HTMLElement>undefined,
            // Крайний видимый элемент с верху
            top_visible_elm: <HTMLElement>undefined,
            // Крайний видимый элемент с низу
            down_visible_elm: <HTMLElement>undefined,
            // Сколько сейчас видимо элементов
            count_visible: <number>0,
        };
    },

    // Методы
    methods: {
        // Срабатывает при достижение конца видаемого списка с НИЗУ
        intersection_down() {
            // console.log("Пересек Низ");
            // Показываем по `next_visible` элементов в низ, и скрываем столько же вверх
            for (let i = 0; i < this.next_visible; i++) {
                // Показать сверху
                this.hiddenTop();
                // Скрыть снизу
                this.showDown();
            }
        },
        // Срабатывает при достижение конца видаемого списка c ВЕРХУ
        intersection_top() {
            // console.log("Пересек Верх");
            if (this.top_visible_elm != this.first_element) {
                // Запоминаем положение скорла до добавления элемента
                const y = this.$refs.box.scrollTop;
                const x = this.$refs.box.scrollLeft;
                console.log(`${y}:${x}`);
                for (let i = 0; i < this.next_visible; i++) {
                    this.hiddenDown();
                    this.showTop();
                }
                // Возвращаем курсор в место до добавления элементов, чтобы не было скачков при скролле
                this.$refs.box.scrollTo(
                    x,
                    // Берем высоту элемента и добавляем к уже сахаренным координатам, чтобы не было скачков
                    y + this.top_visible_elm.offsetHeight
                );
            }
        },
        /*Показать элементы внизу*/
        showDown() {
            // Проверяем можно ли показывать еще элементы
            const c = this.checkCountVisibleFrom_Visible();
            // console.log("showDown -" + c);
            // Если можно показывать
            if (c) {
                // Берем следующий не показанный элемент
                const tmp = this.down_visible_elm.nextElementSibling;
                // Если он существует
                if (tmp) {
                    // И если он не показан
                    if (!tmp.classList.contains("visible")) {
                        // То показываем его
                        tmp.classList.add("visible");
                        // Прибавляем в счетчик показанных
                        this.count_visible += 1;
                        // Смещаем последний(внизу) показанный элемент на, тот что был показан
                        this.down_visible_elm = tmp;
                    }
                }
            }
        },
        /*Показать элементы вверху*/
        showTop() {
            // Проверяем можно ли показывать еще элементы
            const c = this.checkCountVisibleFrom_Visible();
            // console.log("showTop -" + c);
            // Если можно показывать
            if (c) {
                // Берем предыдущий не показанный элемент
                const tmp = this.top_visible_elm.previousElementSibling;
                // Если он существует
                if (tmp) {
                    // И если он не показан
                    if (!tmp.classList.contains("visible")) {
                        // То показываем его
                        tmp.classList.add("visible");
                        // Прибавляем в счетчик показанных
                        this.count_visible += 1;
                        // Смещаем последний(вверху) показанный элемент на, тот что был показан
                        this.top_visible_elm = tmp;
                    }
                }
            }
        },
        /*Скрыть элементы в верху*/
        hiddenDown() {
            // Если можно скрывать
            const c = this.checkCountVisibleFrom_Hidden();
            // console.log("hiddenDown -" + c);
            if (c) {
                // Если он показан
                if (this.down_visible_elm.classList.contains("visible")) {
                    // то скрываем его
                    this.down_visible_elm.classList.remove("visible");
                    // Убавляем счетчик показанных элементов
                    this.count_visible -= 1;
                    // Смещаем последний(внизу) показанный элемент на элемент назад
                    this.down_visible_elm =
                        this.down_visible_elm.previousElementSibling;
                }
            }
        },
        /*Скрыть элементы в верху*/
        hiddenTop() {
            // Если можно скрывать
            const c = this.checkCountVisibleFrom_Hidden();
            // console.log("hiddenTop -" + c);
            if (c) {
                // Если он показан
                if (this.top_visible_elm.classList.contains("visible")) {
                    // то скрываем его
                    this.top_visible_elm.classList.remove("visible");
                    // Убавляем счетчик показанных элементов
                    this.count_visible -= 1;
                    // Смещаем последний(вверху) показанный элемент на элемент вперед
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
        /*Инициализация списка*/
        init() {
            const items = this.$refs.items;
            // Первый элемент из списка
            this.first_element = items.childNodes[1];
            // Последний элемент из списка
            this.last_element = items.childNodes[items.childNodes.length - 1];
            // Начальная позиция
            this.down_visible_elm = items.childNodes[0];
            this.top_visible_elm = items.childNodes[0].nextElementSibling;
            // Показываем сначала максимум доступных элементов
            for (let i = 0; i < this.max_visible; i++) {
                this.showDown();
            }
        },
    },
    mounted() {
        this.init();
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
        ///
        height: 50vh;
        // height: 500px;
        ///
        overflow: auto;
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
