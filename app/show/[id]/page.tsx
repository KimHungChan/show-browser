'use client';
// a page that gets the current show details from the store and displays them
import useShowStore from '@/store/store';
import { useParams } from 'next/navigation';
import { Show } from '@/types/types';
import { useEffect, useState } from 'react';

const ShowPage = () => {
  const selectedShow = useShowStore((state) => state.selectedShow);
  const getShowById = useShowStore((state) => state.getShowById);
  const setSelectedShow = useShowStore((state) => state.setSelectedShow);
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!selectedShow) {
      if (
        localStorage.getItem('selectedShow') &&
        localStorage.getItem('selectedShow') !== 'null'
      ) {
        setSelectedShow(
          JSON.parse(localStorage.getItem('selectedShow') as string) as Show
        );
      } else {
        getShowById(Number(id));
      }
    }
  }, [selectedShow, id, getShowById, setSelectedShow]);

  return (
    <div className="text-white flex flex-col items-center sm:items-baseline px-4 sm:px-16">
      <h1 className="text-5xl">{selectedShow?.name}</h1>
      <div className="flex justify-between my-4 w-full flex-wrap">
        <div>
          <p>Language: {selectedShow?.language}</p>
          <p>Premiered: {selectedShow?.premiered}</p>
          {selectedShow?.status === 'Ended' && (
            <p>Ended: {selectedShow?.ended}</p>
          )}
          <p>Runtime: {selectedShow?.runtime} minutes</p>
          {/* if show ended show the end date */}
        </div>
        <div className="sm:text-right">
          {' '}
          {selectedShow?.rating?.average && (
            <p>Rating: {selectedShow?.rating?.average}</p>
          )}
          <p>Genres: {selectedShow?.genres.join(' • ')}</p>
        </div>
      </div>
      <img
        // src={selectedShow?.image?.original}
        srcSet={`${selectedShow?.image?.medium} 700w, ${selectedShow?.image?.original} 1200w`}
        alt={selectedShow?.name}
        className="h-96 w-64 object-cover"
      />
      <p className="mt-8">
        {showMore
          ? selectedShow?.summary.replace(/<[^>]*>?/gm, '')
          : selectedShow?.summary
              .replace(/<[^>]*>?/gm, '')
              .slice(0, 200)
              .padEnd(203, '...')}
      </p>
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-white bg-black p-2 rounded-md  flex w-full justify-center mt-4 bg-opacity-50 hover:bg-opacity-70 bg-black-gray"
      >
        {!showMore ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
        )}
      </button>
    </div>
  );
};

export default ShowPage;
