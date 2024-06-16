<template>
  <input type="text" v-model="searcher" />

  <button @click="findFilms">Find</button>

  <button :disabled="currentPageIndex === 0" @click="currentPageIndex--">Prev page</button>
  <button @click="currentPageIndex++">Next page</button>

  <p>{{ paginatedData.length === 0 ? "Пока что ничего не нашли" : "" }}</p>

  <ul class="film-list" @scroll="onLoadMoreFilms">
    <film-card v-for="(film, idx) in paginatedData" :film="film" :index="idx + currentPageIndex * filmsPerPage" :key="film.id" />
  </ul>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import fetchFilms from "../api/index";
import filmsPerPage from "../utils/const";
import FilmCard from "./FilmCard.vue";

const searcher = ref("");
const currentPageIndex = ref(0);
const paginatedData = ref([]);

watch(currentPageIndex, async () => {
  const newData = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);
  if (newData.length === 0) {
    currentPageIndex.value--;
    return;
  }
  paginatedData.value = newData;
});

onMounted(async () => {
  paginatedData.value = await fetchFilms("", 0, filmsPerPage);
});

const onLoadMoreFilms = async (event) => {
  const elemList = event.target;

  if (elemList.scrollTop + elemList.clientHeight >= elemList.scrollHeight) {
    const newData = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);

    paginatedData.value = paginatedData.value.concat(newData);
    this.currentPageIndex.value++;
  }
};

const findFilms = async () => {
  paginatedData.value = [];
  currentPageIndex.value = 0;

  //refList.value.scrollTop = 0;
  paginatedData.value = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);
};

const loadIntervalPages = () => {};
</script>

<style lang="scss" scoped>
.film-list {
  display: grid;

  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  row-gap: 30px;
  padding-right: 10px;
  list-style-type: none;
  height: 90vh;
  overflow: scroll;
}

.film {
  color: black;
  min-width: 500px;
  min-height: 340px;
  background: rgb(60, 62, 68);
  border-radius: 10px;
  padding: 10px 20px;
  max-height: max-content;
}
</style>
