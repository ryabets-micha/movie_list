

// Конструктор для Get запроса
class HttpGet {
  constructor() {
    this.get = (aUrl, aCallback) => {
      const anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = () => {
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
          aCallback(anHttpRequest.responseText);
      }

      anHttpRequest.open("GET", aUrl, true);
      anHttpRequest.send(null);
    }
  }
}