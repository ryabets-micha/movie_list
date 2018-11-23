
// Проверяем есть ли на странице выведенные фыльмы для избежания дублирования
const clearContent = () => {
  let box = document.getElementById('content');

  if (box.firstChild) {
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
  }
}