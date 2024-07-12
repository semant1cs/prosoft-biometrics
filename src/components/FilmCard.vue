<template>
  <li class="card">
    <div class="card-index">
      {{ film.imdb_id }}
    </div>

    <a v-if="film.homepage" class="card-image" href="#"
      ><img
        class="card-image__img"
        :src="getRandomColorImage()"
        alt=""
    /></a>

    <div v-else class="card-image">
      <img
        class="card-image__img"
        :src="getRandomColorImage()"
        alt=""
      />
    </div>

    <div class="card-info">
      <div class="card-info-film">
        <a class="card-main-info">
          <a class="card-main-info-title" :href="film.homepage">{{ film.original_title }} {{ film.adult ? "18+" : "" }}</a>
          <div class="card-info-genres">
            <span v-for="(genre, idx) in film.genres" :key="genre.name">{{ genre.name }}{{ idx < film.genres.length - 1 ? ", " : "" }} </span>
          </div>
          <div class="card-info-countries">
            <span v-for="(country, idx) in film.production_countries" :key="country.name">
              {{ country.name }}{{ idx < film.production_countries.length - 1 ? ", " : "" }}
            </span>
          </div>
        </a>

        <span class="card-info-original-language">{{ film.original_language.toUpperCase() }}</span>
        <span class="popularity">{{ film.popularity.toFixed(2) }}</span>
        <span class="card-info-release-date">{{ film.release_date !== null ? film.release_date.slice(0, 4) : "-" }}</span>
        <span class="card-info-runtime">{{ film.runtime ? film.runtime.toString() + " minutes" : "-" }}</span>
        <span class="card-info-budget">{{ film.budget ? film.budget.toLocaleString("ru") : "-" }}</span>
        <span class="card-info-revenue">{{ film.revenue ? film.revenue.toLocaleString("ru") : "-" }}</span>
        <span class="card-info-status">{{ film.status ?? "-" }}</span>
        <span class="card-info-rating">{{ film.vote_average.toPrecision(2) }}</span>
      </div>
    </div>
  </li>
</template>

<script setup>
import { getRandomColorImage } from '../utils/const';
const props = defineProps({ film: { type: Object, required: true } });
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  
  box-sizing: border-box;
  width: 100%;
  padding: 24px 20px;
  max-height: 150px;
  min-width: 100%;
  border-radius: 16px;
  transition-timing-function: ease-out;
  transition-duration: 0.15s;
  transition-property: background-color;
  border: gray 1px solid;
}

.card-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 24px;
  text-align: center;
}

.card-image {
  margin-left: 20px;

  &__img {
    height: 100px;
    width: 60px;
    object-fit: cover;
  }
}

.card-info {
  width: 100%;
  margin-left: 20px;
}

.card-info-film {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  width: 100%;
  color: black;
}

.card-main-info {
  display: block;
}
</style>
