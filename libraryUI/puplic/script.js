const del = document.querySelectorAll('.delete');
const imgs = document.querySelectorAll('img');
imgs.forEach((img) => {
  img.addEventListener('click', removeElement.bind(null, img));
});

function removeElement(el) {
  if (el.classList.contains('delete')) {
    console.log(el.id);
    const endpoint = `book/${el.id}`;
    fetch(endpoint, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.error(err));
  }
}
