'use client';
// a page that gets the current show details from the store and displays them
import useShowStore from '@/store/store';
import { useParams } from 'next/navigation';
import { Show } from '@/types/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/store/store';

const ShowPage = () => {
  const selectedShow = useShowStore((state) => state.selectedShow);
  const getShowById = useShowStore((state) => state.getShowById);
  const setSelectedShow = useShowStore((state) => state.setSelectedShow);
  const getSelectedShowExtraData = useShowStore(
    (state) => state.getSelectedShowExtraData
  );
  const selectedShowExtraData = useShowStore(
    (state) => state.selectedShowExtraData
  );
  const [showMoreSummary, setShowMoreSummary] = useState(false);
  const [showMoreCast, setShowMoreCast] = useState(false);
  const [showMoreSeasons, setShowMoreSeasons] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!selectedShow) {
      getShowById(Number(id));
    }
    getSelectedShowExtraData(Number(id));
  }, [selectedShow, id, getShowById, getSelectedShowExtraData]);

  console.log('selectedShow', selectedShow);

  return (
    <div className="text-white flex flex-col items-center sm:items-baseline px-4 sm:px-16">
      <button
        onClick={() => router.back()}
        className="text-black bg-white p-2 rounded-md  flex w-40 justify-center mb-4  hover:bg-opacity-90"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <h1 className="text-5xl">{selectedShow?.name}</h1>
      <div className="flex justify-between my-4 w-full flex-wrap">
        <div>
          <p>Language: {selectedShow?.language}</p>
          <p>Premiered: {selectedShow?.premiered}</p>
          {selectedShow?.status === 'Ended' && (
            <p>Ended: {selectedShow?.ended}</p>
          )}
          {selectedShow?.runtime && (
            <p>
              <i className="fa-solid fa-clock"></i> {selectedShow?.runtime}{' '}
              minutes
            </p>
          )}
        </div>
        <div className="sm:text-right">
          {' '}
          {selectedShow?.rating?.average && (
            <p>
              {' '}
              <i
                className="fa-solid fa-star"
                style={{ color: '#FFD43B' }}
              ></i>{' '}
              {selectedShow?.rating?.average}
            </p>
          )}
          {selectedShow?.genres && selectedShow.genres.length > 0 && (
            <p>{selectedShow?.genres.join(' • ')}</p>
          )}
        </div>
      </div>
      {selectedShow?.image ? (
        <img
          srcSet={`${selectedShow?.image?.medium} 700w, ${selectedShow?.image?.original} 1200w`}
          alt={selectedShow?.name}
          className="h-96 w-64 object-cover"
        />
      ) : (
        <div className="h-96 w-64 bg-gray-200 text-black flex justify-center items-center">
          {selectedShow?.name}
        </div>
      )}

      <p className="mt-8">
        {showMoreSummary
          ? selectedShow?.summary?.replace(/<[^>]*>?/gm, '')
          : selectedShow?.summary
              ?.replace(/<[^>]*>?/gm, '')
              .slice(0, 200)
              .padEnd(203, '...')}
      </p>
      {selectedShow?.summary && selectedShow?.summary.length > 200 && (
        <button
          onClick={() => setShowMoreSummary(!showMoreSummary)}
          className="text-white bg-black p-2 rounded-md  flex w-full justify-center mt-4 bg-opacity-50 hover:bg-opacity-70 bg-black-gray"
        >
          {!showMoreSummary ? (
            <i className="fa-solid fa-chevron-down"></i>
          ) : (
            <i className="fa-solid fa-angle-up"></i>
          )}
        </button>
      )}

      <h2 className="my-4 text-3xl">Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedShowExtraData?.episodes.slice(0, 6).map((episode) => (
          <div
            key={episode.id}
            className="bg-black-gray text-white rounded-md overflow-hidden"
          >
            {episode.image ? (
              <img
                srcSet={`${episode?.image?.medium} 700w, ${episode?.image?.original} 1200w`}
                alt={episode.name}
                className="h-48 object-cover"
              />
            ) : (
              <div className="h-48 w-96 bg-gray-200 text-black flex justify-center items-center">
                {episode.name}
              </div>
            )}
            <div className="p-2">
              <h3 className="font-bold">{episode.name}</h3>
              <p>Season: {episode.season}</p>
              <p>Episode: {episode.number}</p>
              <p>Airdate: {episode.airdate}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedShowExtraData?.episodes.length > 6 && (
        <button
          onClick={() => router.push(`/show/${selectedShow?.id}/episodes`)}
          className="text-white bg-black p-2 rounded-md  flex w-full justify-center mt-4 bg-opacity-50 hover:bg-opacity-70 bg-black-gray"
        >
          See All Episodes
        </button>
      )}

      <h2 className="my-4 text-3xl">Seasons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedShowExtraData?.seasons
          .slice(0, showMoreSeasons ? selectedShowExtraData?.seasons.length : 3)
          .map((season) => (
            <div
              key={season.id}
              className="bg-black-gray text-white rounded-md"
            >
              <img
                src={season.image?.medium}
                alt={season.name}
                srcSet={`${season?.image?.medium} 700w, ${season?.image?.original} 1200w`}
                className="w-64 h-72 object-cover"
              />
              <div className="p-4">
                <h3>{season.name}</h3>
                <p>Season: {season.number}</p>
              </div>
            </div>
          ))}
      </div>
      {selectedShowExtraData?.seasons.length > 3 && (
        <button
          onClick={() => setShowMoreSeasons(!showMoreSeasons)}
          className="text-white bg-black p-2 rounded-md  flex w-full justify-center mt-4 bg-opacity-50 hover:bg-opacity-70 bg-black-gray"
        >
          {!showMoreSeasons ? (
            <i className="fa-solid fa-chevron-down"></i>
          ) : (
            <i className="fa-solid fa-angle-up"></i>
          )}
        </button>
      )}

      <h2 className="my-4 text-3xl">Cast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedShowExtraData?.cast
          .slice(0, showMoreCast ? selectedShowExtraData?.cast.length : 3)
          .map((cast) => (
            <div
              key={cast.person.id}
              className="bg-black-gray text-white rounded-md"
            >
              <img
                alt={cast.person.name}
                srcSet={`${cast.person?.image?.medium} 700w, ${cast.person?.image?.original} 1200w`}
                className="w-full h-80 object-cover"
              />
              <div className="p-4 flex flex-col justify-items-end">
                <h3>{cast.person.name}</h3>
                <p>Character: {cast.character.name}</p>
              </div>
            </div>
          ))}
      </div>
      {selectedShowExtraData?.cast.length > 3 && (
        <button
          onClick={() => setShowMoreCast(!showMoreCast)}
          className="text-white bg-black p-2 rounded-md  flex w-full justify-center mt-4 bg-opacity-50 hover:bg-opacity-70 bg-black-gray"
        >
          {!showMoreCast ? (
            <i className="fa-solid fa-chevron-down"></i>
          ) : (
            <i className="fa-solid fa-angle-up"></i>
          )}
        </button>
      )}
    </div>
  );
};

export default ShowPage;
