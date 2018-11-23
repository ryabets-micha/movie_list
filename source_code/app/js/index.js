window.onload = () => {
  let url = 'https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&primary_release_date.gte=2000-09-15&primary_release_date.lte=2018-10-22&page=1';

  let filmArray;
  let isClicked = false;
  const getFilms = new HttpGet();

  getFilms.get(url,
    (response) => {
      filmArray = JSON.parse(response);
      clearContent();

      showFilmList(filmArray.results);

      pagination(filmArray.total_pages, isClicked);
    }
  );

  // Переключаемся между страницами с фильмами
  const handlePage = (target) => {
    clearContent();

    let this_page = document.getElementsByClassName('paginator_item_active')[0];

    this_page && this_page.classList.remove('paginator_item_active');
    this_page = document.getElementById(target.id);
    this_page.classList.add('paginator_item_active');

    url = url.replace(/\d+$/ig, target.id.slice(4));

    getFilms.get(url,
      (response) => {
        filmArray = JSON.parse(response);
        isClicked = true;
        showFilmList(filmArray.results);

        pagination(filmArray.total_pages, isClicked);
      }
    );
  }

  // Поиск
  const search = () => {
    clearContent();

    const nameField = document.getElementById('name_field');
    const yearField = document.getElementById('year_field');

    url = 
      nameField.value && !yearField.value ?

        `http://api.themoviedb.org/3/search/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&query=${nameField.value}&page=1`

      : !nameField.value && yearField.value ?

        `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&primary_release_date.gte=${yearField.value}-01-01&primary_release_date.lte=${yearField.value}-12-31&page=1`

      : nameField.value && yearField.value ?
        
        `http://api.themoviedb.org/3/search/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&query=${nameField.value}&year=${yearField.value}&page=1`
        
      : 'https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&primary_release_date.gte=2000-09-15&primary_release_date.lte=2018-10-22&page=1';

    getFilms.get(url,
      (response) => {
        filmArray = JSON.parse(response);
        isClicked = false;
        showFilmList(filmArray.results);

        document.getElementById('paginatorBox') &&
          document.getElementById('contentWrap').removeChild(document.getElementById('paginatorBox'));

        pagination(filmArray.total_pages, isClicked);
      }
    );
  }

  // Прокручиваем номера страниц вправо
  const handleNumberRight = () => {
    if (+document.getElementById('paginatorItems').lastChild.id.slice(4) < filmArray.total_pages) {

      document.getElementById('paginatorItems').removeChild(document.getElementById('paginatorItems').firstChild);

      document.getElementById('paginatorItems').innerHTML +=
        `<span class="paginator_item" id="page${+document.getElementById('paginatorItems').lastChild.id.slice(4) + 1}">
          ${+document.getElementById('paginatorItems').lastChild.id.slice(4) + 1}
        </span>`;
    }
  }

  // Прокручиваем номера страниц влево
  const handleNumberLeft = () => {
    const parent = document.getElementById('paginatorItems');
    if (+parent.firstChild.id.slice(4) > 1) {

      parent.removeChild(parent.lastChild);

      let firstId = +parent.firstChild.id.slice(4);
      let span = document.createElement('SPAN');

      span.classList.add('paginator_item');
      span.id = 'page' + (firstId - 1);
      span.innerHTML = firstId - 1;
      
      parent.insertBefore(span, parent.children[0]);
    }
  }

  let clickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchend');

  document.body.addEventListener( clickEventType, function (e) {
    e = e || event;
    const target = e.target || e.srcElement;

    // Открыть детали о фильме
    target.tagName === "DIV" && target.id.includes("film") && showModal(filmArray.results, target);

    // Закрыть детали о фильме
    if (target.tagName === 'SPAN' && target.id === 'modal_exit' ||
      target.tagName === 'DIV' && target.id === 'modal_overlay') {

      const modal = document.getElementById('modal_overlay');
      modal && modal.parentNode.removeChild(modal);
      document.body.style.overflow = '';

      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream &&
      (document.getElementById('contentWrap').style.overflowY = '');

    }

    // Переходим между страницами
    target.tagName === 'SPAN' && target.id.includes('page') && handlePage(target, url, getFilms);

    // Поиск
    target.tagName === 'INPUT' && target.id.includes('search') && search(url);

    // Прокрутить кнопки навигации страниц вперед
    target.tagName === 'SPAN' && target.id.includes('next') && handleNumberRight();

    // Прокрутить кнопки навигации страниц назад
    target.tagName === 'SPAN' && target.id.includes('prev') && handleNumberLeft();
  });
};