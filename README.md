# Отображение базы фильмов

## Почему Vue?

Я имею достаточно опыта, чтобы быстро развернуть небольшое приложение на Vue, а именно с Vue разработка будет намного быстрее(imho), также имею большой опыт разработки на React, есть примеры кода с прошлых проектов. Но я посчитал, что эту задачу можно решить грамотнее и элегантнее с помощью Vue.

## Почему задача показалось крайне интересной на фоне предыдущих?

Когда я увидел, что объем принимаемых данных может достигать целых !!44МБ!! я сначала не обратил на это внимания, но тут же вспомнил, что являюсь Frontend-разработчиком и 44МБ для браузерной страницы крайне много(при этом без подгрузки изображений, оптимизировать загрузку которых намного проще, но не суть).

Сразу же появился вопрос: "А нужно ли мне получать абсолютно все эти данные?" К нему вернёмся позже)
В мыслях появились слова: "Lazy Loading", "Pagination", "Debounce", "Request Cancellation", "Intersection Observer API".

### С помощью Lazy Loading и Intersection Observer API наши данные могли не подгружаться до тех пор, пока не будут находится в поле зрения пользователя, что нам и нужно было.

### Пагинация была одним из условия тестового задания, так что её реализовал бы в любом случае.

Реализована она двумя путями:
 - С помощью страниц, отслеживанием текущего индекса страницы и на основании этого индекса изменение отображаемых данных. 
 - При scroll'е вниз, когда мы достигаем конца списка, у нас подгружаются(добавляются к текущим) новые элементы.

### Debounce, Request Cancellation.

Эти два приёма я бы использовал вместе, чтобы добиться большего результата при поиске. 
Debounce позволяет отправлять поисковые запросы только в том случае, если интервал между нынешним временем и предыдущим введенным значением больше установленного.
 - Нооооо... Что если данных приходит очень много, а пользователь уже ввёл новый поисковый запрос?
 - Получается, что если пользователь ввёл новый запрос, значит результат выполнения старого уже не нужен. Тогда мы можем предыдущий запрос отменить, например axios, начиная с версии v0.22.0 поддерживает AbortController.

"А нужно ли мне получать абсолютно все эти данные?"

Решением этой проблемы как раз стал "кастомный Lazy Loading", без Intersection Observer API, так как с этим инструментом я не работал, но наслышан о нём.

Придуманное мной решение работает таким образом, что:
1) Мы можем подгрузить список до n-го элемента.
2) После попытки подгрузить список дальше массив списка обрезается в интервале (elementsPerPage, elementsList.length - 1)
3) В конец массива подгружаются новые данные

Таким образом размер массива элементов не превысит определенное количество и мы можем листать наш список элементов до тех пор, пока не кончатся данные на сервере.
