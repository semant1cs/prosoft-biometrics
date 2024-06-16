import axios from "axios";

const fetchFilms = async (searchField, page, pageSize, sortField, sortOrder) => {
  // sort_field: sortField, sort_order: sortOrder можно добавить
  // эти поля и использовать их в фильтрах, которые находятся
  //  в FilmList.vue, однако запрос выдает ошибку

  return axios
    .post("http://185.185.69.80:8082/list", { search: searchField, page: page, page_size: pageSize }, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      const dataObject = response.data;

      return dataObject.data;
    })
    .catch((e) => console.log(e));
};

export default fetchFilms;
