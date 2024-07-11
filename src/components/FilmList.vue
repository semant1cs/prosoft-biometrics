<template>
  <input type="text" v-model="filmStore.searcher" />

  <button @click="filmStore.findFilms">Find</button>

  <button v-if="filmStore.scrolledPagesCount === 0" :disabled="filmStore.currentPageIndex === 0" @click="filmStore.currentPageIndex--">Prev page</button>
  <button v-if="filmStore.scrolledPagesCount === 0" @click="filmStore.currentPageIndex++">Next page</button>
  <button v-if="filmStore.currentPageIndex !== 0 || filmStore.searcher !== ''" @click="resetPositionView">Reset</button>

  <p>{{ filmStore.paginatedData.length === 0 ? "Пока что ничего не нашли" : "" }}</p>

  <select v-model="filmStore.selectedSortBy">
    <option v-for="sortField in sortFields" :value="sortField" :key="sortField">{{ sortField }}</option>
    <!-- TODO:  -->
    <!-- отсюда берем значение и сортируем в запросе sort_field -->
  </select>

  <select v-model="filmStore.selectedSortOrder">
    <option value="desc">desc</option>
    <option value="asc">asc</option>
    <!-- TODO:  -->
    <!-- отсюда берем значение и сортируем в запросе sort_order -->
  </select>

  <ul class="film-list" ref="scrolledList" @scroll="filmStore.onLoadMoreFilms">
    <film-card v-for="film in filmStore.paginatedData" :film="film" :key="film.imdb_id" />
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { sortFields } from "../utils/const";
import { useFilmStore } from "../store/filmstore";

import FilmCard from "./FilmCard.vue";

const scrolledList = ref(null);
const filmStore = useFilmStore();

const resetPositionView = () => {
  filmStore.resetView();
  scrolledList.value.scrollTop = 0;
}

onMounted(() => {
  if (scrolledList.value && !filmStore.isListInited) {
    if (scrolledList.value?.scrollHeight < window.screen.availHeight) {
      filmStore.toNextPage();
      filmStore.isListInited = true;
    }
  }
})

</script>

<style lang="scss" scoped>
.film-list {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  row-gap: 30px;
  padding-right: 10px;
  list-style-type: none;
  height: 80vh;
  width: 90vw;
  overflow-y: scroll;
}

.film {
  color: black;
  min-width: 500px;
  max-height: 340px;
  background: rgb(60, 62, 68);
  border-radius: 10px;
  padding: 10px 20px;
  max-height: max-content;
}
</style>
