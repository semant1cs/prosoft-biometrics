import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { fetchFilms } from "../api";
import { filmsPerPage } from "../utils/const";

export const useFilmStore = defineStore('filmStore', () => {
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
})