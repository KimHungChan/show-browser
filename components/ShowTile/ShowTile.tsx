'use client';
import { useState } from 'react';
import { Show } from '@/types/types';
import { useRouter } from 'next/navigation';
import useShowStore from '@/store/store';
const ShowTile = ({ showResult }: { showResult: Show }) => {
  const [hovering, setHovering] = useState(false);
  const setSelectedShow = useShowStore((state) => state.setSelectedShow);
  const router = useRouter();
  return (
    <div
      className={`${'w-48 h-88 hover:scale-150 transition-transform duration-300 ease-in-out cursor-pointer rounded-md flex flex-col overflow-hidden shadow-xl hover:z-10'}`}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setSelectedShow(showResult);
        router.push(`/show/${showResult.id}`);
      }}
      data-testid="show-tile"
    >
      {showResult?.image ? (
        <img
          srcSet={`${showResult?.image?.medium} 700w, ${showResult?.image?.original} 1200w`}
          alt={showResult?.name}
          className="w-48 h-full object-cover"
        />
      ) : (
        <div className="w-48 h-full bg-black-gray text-white flex justify-center items-center">
          {showResult?.name}
        </div>
      )}
      <div
        className={`${
          hovering ? 'visible' : 'invisible'
        } bg-black-gray text-white p-2 w-full absolute bottom-0 left-0 animate-fade-in transition-opacity duration-800 ease-in-out`}
      >
        <h2 className="font-bold">{showResult?.name}</h2>
        {showResult?.rating?.average && (
          <p className="text-sm">Rating: {showResult?.rating?.average}</p>
        )}

        <p className="text-sm">{showResult?.genres.join(' • ')}</p>
      </div>
    </div>
  );
};

export default ShowTile;
