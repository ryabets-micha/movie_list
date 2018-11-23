

// Делим фильмы на страницы
const pagination = (number, isClicked) => {
  if (number > 1) {

    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('paginator_box');
    paginationContainer.id = 'paginatorBox';

    const paginationItems = document.createElement('div');
    paginationItems.classList.add('paginator_items');
    paginationItems.id = 'paginatorItems';

    if (!isClicked && number > 5) {
      paginationContainer.innerHTML = 
        `<span class="paginator_prev" id="paginator_prev">
          <
        </span>`;
      for (let i = 0; i < 5; i += 1) {
        paginationItems.innerHTML +=
          `<span class="paginator_item" id="page${i + 1}">
            ${i + 1}
          </span>`
      }

      paginationContainer.appendChild(paginationItems);

      paginationContainer.innerHTML += 
        `<span class="paginator_next" id="paginator_next">
          >
        </span>`;
      document.getElementById('contentWrap').appendChild(paginationContainer);
      
    } else if (!isClicked && number < 5) {
      for (let i = 0; i < number; i += 1) {
        paginationContainer.innerHTML +=
          `<span class="paginator_item" id="page${i + 1}">
            ${i + 1}
          </span>`
      }
      document.getElementById('contentWrap').appendChild(paginationContainer);
    }

    if (!isClicked) {
      const this_page = document.getElementById('page1');
      this_page && this_page.classList.add('paginator_item_active');
    }
  }
}