import { create } from 'zustand';
import {
  Show,
  ShowResult,
  Episode,
  Season,
  Cast,
  ShowImage,
} from '../types/types';
import {
  searchTvShows,
  getShowById,
  getShowEpisodes,
  getShowSeasons,
  getShowCast,
  getShowImages,
} from '@/api/api';

type ShowState = {
  selectedShow: Show | null;
  setSelectedShow: (show: Show) => void;
  shows: ShowResult[];
  searchTvShows: (searchTerm: string) => Promise<void>;
  getShowById: (id: number) => Promise<void>;
  selectedShowExtraData: ShowExtraData;
  getSelectedShowExtraData: (id: number) => Promise<void>;
};

type ShowExtraData = {
  episodes: Episode[];
  seasons: Season[];
  cast: Cast[];
  images: ShowImage[];
};

const useShowStore = create<ShowState>()((set) => ({
  selectedShow: null,
  setSelectedShow: (show: Show) => set({ selectedShow: show }),
  selectedShowExtraData: {
    episodes: [],
    seasons: [],
    cast: [],
    images: [],
  } as ShowExtraData,
  shows: [],
  searchTvShows: async (searchTerm: string) => {
    try {
      const response = await searchTvShows(searchTerm);
      set({ shows: response });
    } catch (error) {
      console.error(error);
    }
  },
  getShowById: async (id: number) => {
    try {
      const response = await getShowById(id);
      set({ selectedShow: response });
      localStorage.setItem('selectedShow', JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  },
  getSelectedShowExtraData: async (id: number) => {
    try {
      const [episodes, seasons, cast, images] = await Promise.all([
        getShowEpisodes(id),
        getShowSeasons(id),
        getShowCast(id),
        getShowImages(id),
      ]);
      set((state) => ({
        selectedShowExtraData: {
          ...state.selectedShowExtraData,
          episodes,
          seasons,
          cast,
          images,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useShowStore;
