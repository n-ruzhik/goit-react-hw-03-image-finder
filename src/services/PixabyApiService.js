const API_KEY = '34339097-c9f7f7c632c3a534fa2bb6c6d';

const fetchImage = async (query, page = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await response.json();
};

const api = {
  fetchImage,
};

export default api;
