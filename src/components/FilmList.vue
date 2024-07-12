<template>
 <film-list-controller :resetPositionView="resetPositionView"/>

  <ul class="film-list" ref="scrolledList" @scroll="filmStore.onLoadMoreFilms">
    <li><legend-film-list/></li>
    <film-card v-for="film in filmStore.paginatedData" :film="film" :key="film.imdb_id" />
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useFilmStore } from "../store/filmstore";

import FilmCard from "./FilmCard.vue";
import LegendFilmList from "./LegendFilmList.vue";
import FilmListController from "./FilmListController.vue";

const scrolledList = ref(null);
const filmStore = useFilmStore();

onMounted(() => {
  if (scrolledList.value && !filmStore.isListInited) {
    if (scrolledList.value?.scrollHeight < window.screen.availHeight) {
      filmStore.toNextPage();
      filmStore.isListInited = true;
    }
  }
})


const resetPositionView = () => {
  filmStore.resetView();
  scrolledList.value.scrollTop = 0;
}
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
