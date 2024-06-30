'use client';
// a page that gets the current show details from the store and displays them
import useShowStore from '@/store/store';
import { useParams } from 'next/navigation';
import { Show } from '@/types/types';
import { useEffect } from 'react';

const ShowPage = () => {
  const selectedShow = useShowStore((state) => state.selectedShow);
  const getShowById = useShowStore((state) => state.getShowById);
  const setSelectedShow = useShowStore((state) => state.setSelectedShow);
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
    <div>
      <h1>{selectedShow?.name}</h1>
      <img src={selectedShow?.image?.original} alt={selectedShow?.name} />
      <p>{selectedShow?.summary}</p>
    </div>
  );
};

export default ShowPage;
