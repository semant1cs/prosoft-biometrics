import { defineStore } from "pinia"
import { onMounted, ref, watch } from "vue"
import { fetchFilms } from "../api";
import { filmsPerPage } from "../utils/const";

export const useFilmStore = defineStore('filmStore', () => {
    const searcher = ref("");
    const currentPageIndex = ref(0);
    const paginatedData = ref([]);

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

    async function onLoadMoreFilms(event) {
        const elemList = event.target;
      
        if (elemList.scrollTop + elemList.clientHeight >= elemList.scrollHeight) {
          scrolledPagesCount.value++;
          const newData = await fetchFilms(searcher.value, scrolledPagesCount.value, filmsPerPage);
      
          paginatedData.value = paginatedData.value.concat(newData);
      
          if (paginatedData.value.length > 20) {
            paginatedData.value = paginatedData.value.slice(filmsPerPage, paginatedData.value.length - 1);
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
      }
    
      onMounted(async () => {
        paginatedData.value = await fetchFilms("", 0, filmsPerPage);
      });

    return {searcher, currentPageIndex, paginatedData, scrolledPagesCount, selectedSortBy, selectedSortOrder, onLoadMoreFilms, findFilms, resetView}
})