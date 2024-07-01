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

export const getShowEpisodes = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}shows/${id}/episodes`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getShowSeasons = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}shows/${id}/seasons`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getShowCast = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}shows/${id}/cast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getShowImages = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}shows/${id}/images`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
