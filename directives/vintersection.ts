/*
Обработка события достижения - достижение указного элемента.

Это можно использовать для бесконечной ленты постов, 
для динамической подгруздки постов при достижения конца спика.


:::Пример использования:::
<template>
    <div>
        <transition-group name="u-list">
            <div v-for="p in files">
                {{ p }}
            </div>
        </transition-group>
        <div v-intersection="ОбработкаСобытия" class="observer">.</div>
    </div>
</template>
<script lang="ts">
export default {
    methods: {
        ОбработкаСобытия() {
            
        },
    },
};
</script>
:::::::::::::::::::::::::::::

*/

interface Tbinding {
	value: any;
}

export default {
	name: "intersection",
	mounted(elm: HTMLElement, binding: Tbinding) {
		/*
        Добавить обработку события - Долистать до указного элемента 
        */
		const callback = (entries: any, observer: any) => {
			if (entries[0].isIntersecting) {
				// Момент пересечения
				// console.log("Пересекли observer");
				// Вызываем событие достижение конца, для  компанента
				binding.value();
			} else {
				// Момент выхода из пересечения
				// console.log("Не Пересекли observer");
			}
		};
		const observer = new IntersectionObserver(
			// Это функция вызовется при пересечение объекта
			callback,
			{
				// При каком проценте видимости должен срабатывать `callback`
				threshold: 0.1,
			}
		);
		observer.observe(elm);
	},
};
