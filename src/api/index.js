import axios from "axios";

let activeRequestsPending = 0;
const controller = new AbortController();

export const fetchFilms = async (searchField, page, pageSize, sortField, sortOrder) => {
  activeRequestsPending++;

  if (activeRequestsPending > 1) {
    controller.abort();
  }

  return sortField !== "" && sortOrder !== "" 
  ? (
    axios.post("http://185.185.69.80:8082/list", { signal: controller.signal, search: searchField, page: page, page_size: pageSize, sort_field: sortField, sort_order: sortOrder }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        const dataObject = response.data;
        activeRequestsPending--;

        return dataObject.data;
      })
      .catch((e) => {
        activeRequestsPending--;
        console.log(e)
      })
    )
  : (
      axios.post("http://185.185.69.80:8082/list", { signal: controller.signal, search: searchField, page: page, page_size: pageSize }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const dataObject = response.data;
          activeRequestsPending--;

          return dataObject.data;
        })
        .catch((e) => {
          activeRequestsPending--;
          console.log(e)
        })
    );
};

