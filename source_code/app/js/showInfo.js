
// Выводим детальную информацию о фильме
const showModal = (filmArray, target) => {
  filmArray.map((obj) => {
    if (target.id.includes(obj.id)) {
      let div = document.createElement('div');

      div.classList.add('modal_overlay');
      div.id = 'modal_overlay';

      div.innerHTML =
        `<div class="modal_item">
            <span class="modal_exit" id="modal_exit"></span>
            <div class="modal_scroll">
              <div class="modal_logo">
                <img src="http://image.tmdb.org/t/p/original${obj.poster_path}" alt="">
              </div>
              <div class="modal_text">
                <h2 class="modal_title">
                  ${obj.title}
                </h2>
                <p class="modal_description">
                  ${obj.overview}
                </p>
                <div class="modal_vote">
                  <div class="modal_average">
                    Average:
                    <span>${obj.vote_average}</span>
                  </div>
                  <div class="modal_count">
                    Total votes:
                    <span>${obj.vote_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      document.body.appendChild(div);
      document.body.style.overflow = 'hidden';

      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream &&
      (document.getElementById('contentWrap').style.overflowY = 'hidden');
    }
  })
}