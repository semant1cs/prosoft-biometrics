<template>
  <input type="text" v-model="searcher" />
  {{ pageCount !== 0 ? currentPageIndex + 1 : 0 }} / {{ pageCount }}

  <button @click="fetchData">Find</button>

  <button :disabled="currentPageIndex === 0" @click="currentPageIndex--">Prev page</button>
  <button :disabled="currentPageIndex === pageCount - 1 || pageCount === 0" @click="currentPageIndex++">Next page</button>

  <p>{{ paginatedData.length === 0 ? "Пока что ничего не нашли" : "" }}</p>
  <ul>
    <li v-for="element in paginatedData" :key="element.id">
      <p>{{ element.original_title }} ({{ element.release_date.slice(0, 4) }}) <span v-if="element.adult === false"> 18+</span></p>

      About film:
      <p>Release date: {{ element.release_date.slice(0, 4) }}</p>
      <p>
        Countries:
        <span v-for="(country, idx) in element.production_countries" :key="country.name"
          >{{ country.name }}{{ idx < element.production_countries.length - 1 ? ", " : "" }}
        </span>
      </p>

      <p>Overview: {{ element.overview }}</p>

      Budget: <span v-if="element.budget !== null">{{ element.budget.toLocaleString("ru") }}</span>
      <span v-else> -</span>
    </li>
  </ul>
</template>

<script lang="ts">
import axios from "axios";
import Film from "../types/Film";

const filmsPerPage = 5;

export default {
  data() {
    return {
      fetchedData: [] as Film[],
      searcher: "",
      currentPageIndex: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .post("http://185.185.69.80:8082/list", { search: this.searcher, page: 5, page_size: 10 }, { headers: { "Content-Type": "application/json" } })
        .then((response: Response) => {
          const dataObject = response.data;
          this.currentPageIndex = 0;
          this.fetchedData = dataObject.data;
        })
        .catch((e) => console.log(e));
    },
  },
  computed: {
    pageCount(): number {
      return Math.ceil(this.fetchedData.length / filmsPerPage);
    },
    paginatedData(): Film[] {
      const start: number = this.currentPageIndex * filmsPerPage;
      const end = start + filmsPerPage;
      console.log(this.fetchedData.slice(start, end));
      return this.fetchedData.slice(start, end);
    },
  },
  watch: {
    searcher() {
      // this.fetchData();
    },
    currentPageIndex() {},
  },
};
</script>

<style lang="scss" scoped></style>
