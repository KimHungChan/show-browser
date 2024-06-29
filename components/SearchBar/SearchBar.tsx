'use client';
import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <input
      type="text"
      value={searchTerm}
      className="border w-48 outline-none"
    />
  );
};

export default SearchBar;
