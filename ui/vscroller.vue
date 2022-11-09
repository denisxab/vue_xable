<!-- 
Ленивый динамический список. Показывает только указанные(min_visible,max_visible) количество элементов.

<vscroller
    :min_visible="10"
    :max_visible="11"
    :count_next="1"
    :height_item="`100px`"
>   
    Сюда можно поместить любой список, обязательно укажите класс `item` ! 
    <div class="item" v-for="(it, id) in files" :key="id">{{ it }}</div>
</vscroller>


Можно добавлять элементы в начало и конец списка, если вставить элемент между видимыми элементами, то это
ошибка.

-->

<template>
    <div ref="vscroller" class="vscroller">
        <div ref="box" class="box">
            <div
                ref="l_top"
                v-intersection="intersection_top"
                class="limit top item"
                @click="intersection_top"
            ></div>
            <div ref="items" class="items_list">
                <slot></slot>
            </div>
            <div
                ref="l_bottom"
                v-intersection="intersection_down"
                class="limit bottom item"
                @click="intersection_down"
            ></div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "vscroller",
    // Компоненты
    components: {},
    // Аргументы
    props: {
        // Сколько минимально отображать элементов(нужно подобрать количество, чтобы высота элементов скрывала нижнею границу)
        min_visible: {
            type: Number,
            default: 10,
        },
        // Сколько максимально отображать элементов
        max_visible: {
            type: Number,
            default: 11,
        },
        // Сколько отображать(и скрывать) при достижения края
        count_next: {
            type: Number,
            default: 1,
        },
        //
        // CSS
        //
        // Высота одного элемента
        height_item: {
            type: String,
            default: "100px",
        },
    },
    // Переменные
    data() {
        return {
            height: 0,
            //
            // Системный
            //
            // Крайний видимый элемент с верху
            top_visible_elm: <HTMLElement>undefined,
            // Крайний видимый элемент с низу
            down_visible_elm: <HTMLElement>undefined,
            // Сколько сейчас видимо элементов
            count_visible: <number>0,
        };
    },
    mounted() {
        // Отслеживаем изменения размера `vscroller`
        this.vscrollerResizeObserver();
        if (this.min_visible >= this.max_visible) {
            throw Error("Минимум больше Максимума");
        } else {
            this.init();
        }
    },
    methods: {
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
            const items: HTMLElement = this.$refs.items;
            const childNodes: HTMLCollection = items.children;
            // Начальная позиция
            this.down_visible_elm = childNodes[0];
            this.top_visible_elm = childNodes[0];
            // Показываем первый элемент
            this.showFirst();
            // Показываем сначала максимум доступных элементов
            for (let i = 0; i < this.max_visible; i++) {
                this.showDown();
            }
        },
        /* Показываем первый элемент */
        showFirst() {
            this.firstElement.classList.add("visible");
            // Прибавляем в счетчик показанных
            this.count_visible += 1;
        },
        // Срабатывает при достижение конца видаемого списка с НИЗУ
        intersection_down() {
            // console.log("Пересек Низ");
            // Показываем по `count_next` элементов в низ, и скрываем столько же вверх
            for (let i = 0; i < this.count_next; i++) {
                // Показать сверху
                this.hiddenTop();
                // Скрыть снизу
                this.showDown();
            }
        },
        // Срабатывает при достижение конца видаемого списка c ВЕРХУ
        intersection_top() {
            // console.log("Пересек Верх");
            if (this.top_visible_elm != this.firstElement) {
                // Запоминаем положение скорла до добавления элемента
                const y = this.$refs.box.scrollTop;
                const x = this.$refs.box.scrollLeft;
                // console.log(`${y}:${x}`);
                for (let i = 0; i < this.count_next; i++) {
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
        /* Отслеживания изменений динамического размера у `vscroller` для установки этого размера в статический размер `box` */
        vscrollerResizeObserver() {
            /* нельзя задать через css динамический размер для `box` 
            так как прокручиваемые списки должны иметь точную высоту */
            const resizeObserver = new ResizeObserver(() => {
                this.$refs.box.style.setProperty(
                    "height",
                    this.$refs.vscroller.offsetHeight + "px"
                );
            });
            resizeObserver.observe(this.$refs.vscroller);
        },
    },
    computed: {
        firstElement() {
            return this.$refs.items.children[0];
        },
    },
};
</script>
<style lang="scss">
@import "wbs/vue/gcolor.scss";

.vscroller {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(156, 192, 147);
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
    height: v-bind(height_item);
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
