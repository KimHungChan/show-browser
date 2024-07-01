'use client';

import useShowStore from '../../../../store/store';

const EpisodeListPage = () => {
  const selectedShowExtraData = useShowStore(
    (state) => state.selectedShowExtraData
  );
  const selectedShow = useShowStore((state) => state.selectedShow);

  return (
    <div className="grid grid-cols-1 gap-y-8 px-16 text-white">
      <h1 className=" text-6xl">Episode List</h1>
      <h2 className="text-2xl">{selectedShow?.name}</h2>
      {selectedShowExtraData.episodes?.map((episode) => (
        <div key={episode.id} className="flex gap-x-4">
          <div>
            {episode.image?.medium && (
              <img src={episode?.image?.medium} alt={episode.name} />
            )}
          </div>
          <div>
            <div className="flex justify-between">
              <h2>{`S${episode.season
                .toString()
                .padStart(2, '0')}E${episode.number
                .toString()
                .padStart(2, '0')} ${episode.name}`}</h2>
              <div className="flex gap-2 items-center">
                <i
                  className="fa-solid fa-star"
                  style={{ color: '#FFD43B' }}
                ></i>
                {episode.rating?.average && <p> {episode.rating?.average}</p>}
              </div>
            </div>
            <p>
              {episode?.summary &&
                episode?.summary?.replace(/<[^>]*>?/gm, '').substring(0, 100)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeListPage;
