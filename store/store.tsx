import { create } from 'zustand';
import { Show, ShowResult } from '../types/types';
import { searchTvShows, getShowById } from '@/api/api';

type ShowState = {
  selectedShow: Show | null;
  setSelectedShow: (show: Show) => void;
  shows: ShowResult[];
  searchTvShows: (searchTerm: string) => Promise<void>;
  getShowById: (id: number) => Promise<void>;
};

const useShowStore = create<ShowState>()((set) => ({
  selectedShow: null,
  setSelectedShow: (show: Show) => set({ selectedShow: show }),
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
}));

export default useShowStore;
