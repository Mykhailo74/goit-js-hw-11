import axios from 'axios'; // Імпорт функції для HTTP-запитів
import createMarkup from './createMarkup';
import './styles.css';
import './ax.js'; 

import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  currentQuery = e.target.searchQuery.value;
  await searchImages(currentQuery, currentPage);
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await searchImages(currentQuery, currentPage);
});

async function searchImages(query, page) {
  try {
    const response = await axios.getImages(query, page); // Використовуємо функцію з axios.js
    const data = response.data;

    if (data.hits.length === 0) {
      // Вивести повідомлення про відсутність результатів
    } else {
      // Рендерити картки зображень
      createMarkup(data.hits);
      if (data.totalHits <= page * 40) {
        loadMoreBtn.style.display = 'none';
        // Вивести повідомлення про завершення результатів
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

