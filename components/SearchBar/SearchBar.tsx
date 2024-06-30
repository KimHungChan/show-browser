'use client';
import { useState } from 'react';
import useShowStore from '@/store/store';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTvShows = useShowStore((state) => state.searchTvShows);

  return (
    <div className="flex border bg-black text-white">
      <input
        type="text"
        placeholder="Search for TV Shows..."
        value={searchTerm}
        className="w-48 outline-none bg-black text-white p-2"
        onChange={(value) => setSearchTerm(value.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchTvShows(searchTerm);
          }
        }}
      />
      <button
        onClick={() => searchTvShows(searchTerm)}
        disabled={searchTerm.length === 0}
        className={'p-2'}
      >
        <i
          className={`fa-solid fa-magnifying-glass ${
            searchTerm.length === 0 && 'text-gray-400'
          }`}
        ></i>
      </button>
    </div>
  );
};

export default SearchBar;
