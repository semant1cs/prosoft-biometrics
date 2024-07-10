<template>
  <input type="text" v-model="searcher" />

  <button @click="findFilms">Find</button>

  <button v-if="scrolledPagesCount === 0" :disabled="currentPageIndex === 0" @click="currentPageIndex--">Prev page</button>
  <button v-if="scrolledPagesCount === 0" @click="currentPageIndex++">Next page</button>
  <button v-if="scrolledPagesCount !== 0 || currentPageIndex !== 0 || searcher !== ''" @click="resetView">Reset</button>

  <p>{{ paginatedData.length === 0 ? "Пока что ничего не нашли" : "" }}</p>

  <select v-model="selectedSortBy">
    <option v-for="sortField in sortFields" :value="sortField" :key="sortField">{{ sortField }}</option>
    <!-- TODO:  -->
    <!-- отсюда берем значение и сортируем в запросе sort_field -->
  </select>

  <select v-model="selectedSortOrder">
    <option value="desc">desc</option>
    <option value="asc">asc</option>
    <!-- TODO:  -->
    <!-- отсюда берем значение и сортируем в запросе sort_order -->
  </select>

  <ul class="film-list" ref="scrolledList" @scroll="onLoadMoreFilms">
    <film-card v-for="film in paginatedData" :film="film" :key="film.imdb_id" />
  </ul>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { fetchFilms } from "../api/index";
import { filmsPerPage, sortFields } from "../utils/const";
import FilmCard from "./FilmCard.vue";
import { useFilmStore } from "../store/filmstore";

const filmStore = useFilmStore();

const searcher = ref("");
const currentPageIndex = ref(0);
const paginatedData = ref([]);

const scrolledList = ref(null);
const scrolledPagesCount = ref(0);

const selectedSortOrder = ref("");
const selectedSortBy = ref("");


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

async function onLoadMoreFilms(event) {
  const elemList = event.target;

  if (elemList.scrollTop + elemList.clientHeight >= elemList.scrollHeight) {
    scrolledPagesCount.value++;
    const newData = await fetchFilms(searcher.value, scrolledPagesCount.value, filmsPerPage);

    paginatedData.value = paginatedData.value.concat(newData);

    if (paginatedData.value.length > 20) {
      paginatedData.value = paginatedData.value.slice(filmsPerPage, paginatedData.value.length - 1);
      scrolledList.value.scrollTop -= filmsPerPage * filmsPerPage;
    }
  }
}

async function findFilms() {
  paginatedData.value = [];
  currentPageIndex.value = 0;

  paginatedData.value = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);
}

async function resetView() {
  currentPageIndex.value = 0;
  scrolledPagesCount.value = 0;
  selectedSortOrder.value = "";
  selectedSortBy.value = "";
  searcher.value = "";
  paginatedData.value = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);
  scrolledList.value.scrollTop = 0;
}
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
