import { defineStore } from "pinia"
import { onMounted, ref, watch } from "vue"
import { fetchFilms } from "../api";
import { filmsPerPage, maxFilmsOnPage } from "../utils/const";

export const useFilmStore = defineStore('filmStore', () => {
    const searcher = ref("");
    const currentPageIndex = ref(0);
    const paginatedData = ref([]);

    const scrolledPagesCount = ref(0);
    const isListInited = ref(false);

    const selectedSortOrder = ref("");
    const selectedSortBy = ref("");

    onMounted(async () => {
      paginatedData.value = await fetchFilms("", 0, filmsPerPage);
    });

    watch(currentPageIndex, async () => {
        const newData = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage, selectedSortBy.value, selectedSortOrder.value);
        
        if (newData.length === 0) {
          currentPageIndex.value--;
          return;
        }
        paginatedData.value = newData;
    });

    watch(scrolledPagesCount, async () => {
      const newData = await fetchFilms(searcher.value, scrolledPagesCount.value, filmsPerPage, selectedSortBy.value, selectedSortOrder.value);
      if (newData.length === 0) {
        scrolledPagesCount.value--;
        return;
      }
      paginatedData.value = paginatedData.value.concat(newData);

      if (paginatedData.value.length > maxFilmsOnPage) {
        paginatedData.value = paginatedData.value.slice(filmsPerPage, paginatedData.value.length - 1);
      }
    })

    async function onLoadMoreFilms(event) {
      const elemList = event.target;

      if (elemList.scrollTop + elemList.clientHeight + 1 >= elemList.scrollHeight && isListInited) {
        scrolledPagesCount.value++;
      }
    }

    async function findFilms() {
      paginatedData.value = [];
      currentPageIndex.value = 0;
      
      paginatedData.value = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage, selectedSortBy.value, selectedSortOrder.value);
    }
      
    async function resetView() {
      currentPageIndex.value = 0;
      scrolledPagesCount.value = 0;
      selectedSortOrder.value = "";
      selectedSortBy.value = "";
      searcher.value = "";
      paginatedData.value = await fetchFilms(searcher.value, currentPageIndex.value, filmsPerPage);
    }

    function toNextPage() {
      scrolledPagesCount.value++;
    }

    return { searcher, currentPageIndex, paginatedData, scrolledPagesCount, selectedSortBy, selectedSortOrder, isListInited, onLoadMoreFilms, findFilms, resetView, toNextPage }
})