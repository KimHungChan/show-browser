const BASE_URL = 'https://api.tvmaze.com/';

export const searchTvShows = async (searchTerm: string) => {
  try {
    const response = await fetch(`${BASE_URL}search/shows?q=${searchTerm}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getShowById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}shows/${id}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
