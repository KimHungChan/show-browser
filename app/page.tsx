'use client';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import SearchResultsGrid from '@/components/SearchResultsGrid/SearchResultsGrid';
import useShowStore from '@/store/store';
import NavBar from '@/components/NavBar/NavBar';

export default function Home() {
  const searchTvShows = useShowStore((state) => state.searchTvShows);
  const shows = useShowStore((state) => state.shows);
  return (
    <div>
      <SearchResultsGrid results={shows} />
    </div>
  );
}
