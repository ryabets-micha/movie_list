// Выводим фильмы на страницу
const showFilmList = (arr) => {
  arr.length === 0 && (content.innerHTML = `<span class="nothing">Your search for nothing was found.</span>`);

  for (let i = 0; i < arr.length; i += 1) {
    content.innerHTML +=
      `<div class="film_item">
        <div class="film_item__logo">
          <img src="http://image.tmdb.org/t/p/original${arr[i].poster_path}" alt="">
        </div>
        <h2 class="film_item__title">
          ${arr[i].title}
        </h2>
        <div class="item_overlay"  id="film_${arr[i].id}"></div>
      </div>`;
  }
}