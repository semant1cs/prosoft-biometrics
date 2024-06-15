<template>
  <input type="text" v-model="searcher" />
  {{ currentPageIndex + 1 }} / {{ pageCount }}

  <button @click="fetchData">Find</button>

  <button :disabled="currentPageIndex === 0" @click="currentPageIndex--">Prev page</button>
  <button :disabled="currentPageIndex === pageCount - 1" @click="currentPageIndex++">Next page</button>

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

<script>
import axios from "axios";
import Film from "../types/Film";

const filmsPerPage = 1;

export default {
  data() {
    return {
      fetchedData: [],
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
        .post("http://185.185.69.80:8082/list", { search: this.searcher }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const dataObject = response.data;
          console.log(response);
          this.fetchedData = dataObject.data;
        })
        .catch((e) => console.log(e));
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.fetchedData.length / filmsPerPage);
    },
    paginatedData() {
      const start = this.currentPageIndex * filmsPerPage;
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
