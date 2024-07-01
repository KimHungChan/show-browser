'use client';
import { useState } from 'react';
import useShowStore from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTvShows = useShowStore((state) => state.searchTvShows);
  const pathname = usePathname();
  const router = useRouter();

  const OnSearch = (searchTerm: string) => {
    searchTvShows(searchTerm);
    if (pathname !== '/') {
      router?.push('/');
    }
  };

  return (
    <div className="flex border bg-black text-white">
      <input
        type="text"
        placeholder="Search for TV Shows..."
        value={searchTerm}
        className="w-48 outline-none bg-black text-white p-2"
        onChange={(value) => {
          setSearchTerm(value.target.value);
          if (pathname === '/') OnSearch(value.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            OnSearch(searchTerm);
          }
        }}
      />
      <button
        onClick={() => OnSearch(searchTerm)}
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
