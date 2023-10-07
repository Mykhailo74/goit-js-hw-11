import axios from 'axios';

const API_KEY = 'Y39891721-b360e69a327223f311310cfe1'; // Замінив на свій унікальний ключ доступу

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

// Функція для виконання HTTP-запиту за допомогою Axios
export async function getImages(query, page) {
  try {
    const response = await instance.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export default { getImages };