import { ShowResult } from '@/types/types';
import ShowTile from '@/components/ShowTile/ShowTile';
const SearchResultsGrid = ({ results }: { results: ShowResult[] }) => {
  return (
    <div className="flex gap-x-4 gap-y-8 sm:gap-y-28 lg:gap-y-48 flex-wrap  px-16">
      {results.map((result) => (
        <ShowTile showResult={result.show} key={result.show.id} />
      ))}
    </div>
  );
};

export default SearchResultsGrid;
