import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchResultsGrid from './SearchResultsGrid';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
it('should render the correct number of ShowTile components when results array is provided', () => {
  const results = [
    {
      score: 1,
      show: { id: 1, name: 'Show 1', image: null, rating: null, genres: [] },
    },
    {
      score: 2,
      show: { id: 2, name: 'Show 2', image: null, rating: null, genres: [] },
    },
  ];
  const { getAllByTestId } = render(<SearchResultsGrid results={results} />);
  const showTiles = getAllByTestId('show-tile');
  expect(showTiles.length).toBe(results.length);
});

it('should not render any ShowTile components when results array is empty', () => {
  const results = [];
  const { queryAllByTestId } = render(<SearchResultsGrid results={results} />);
  const showTiles = queryAllByTestId('show-tile');
  expect(showTiles.length).toBe(0);
});
