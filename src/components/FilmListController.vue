<template>
  <label for="searcher"></label>
  <input type="text" id="searcher" placeholder="Поиск" v-model="filmStore.searcher" />

  <button @click="filmStore.findFilms">Find</button>

  <button v-if="filmStore.scrolledPagesCount === 0" :disabled="filmStore.currentPageIndex === 0" @click="filmStore.currentPageIndex--">Prev page</button>
  <button v-if="filmStore.scrolledPagesCount === 0" @click="filmStore.currentPageIndex++">Next page</button>
  <button v-if="filmStore.currentPageIndex !== 0 || filmStore.scrolledPagesCount !== 0" @click="props.resetPositionView">Reset</button>

  <p>{{ filmStore.paginatedData.length === 0 ? "Пока что ничего не нашли" : "" }}</p>

  <select v-model="filmStore.selectedSortBy" title="Сортировка по полю">
    <option v-for="sortField in sortFields" :value="sortField" :key="sortField">{{ sortField }}</option>
  </select>

  <select v-model="filmStore.selectedSortOrder" title="Порядок сортировки">
    <option value="desc">Убывание</option>
    <option value="asc">Возрастание</option>
  </select>
</template>

<script setup>
import { useFilmStore } from "../store/filmstore";
import { sortFields } from "../utils/const";

const props = defineProps({resetPositionView: {type: Function, required: true}})

const filmStore = useFilmStore();
</script>