import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ShowTile from './ShowTile';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

const showResult = {
  id: 1,
  url: 'http://example.com',
  name: 'Example Show',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Running',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2020-01-01',
  ended: null,
  officialSite: 'http://example.com',
  schedule: { time: '20:00', days: ['Monday'] },
  rating: { average: 8.5 },
  weight: 100,
  network: {
    id: 1,
    name: 'Example Network',
    country: { name: 'USA', code: 'US', timezone: 'America/New_York' },
    officialSite: 'http://example.com',
  },
  webChannel: null,
  dvdCountry: null,
  externals: { tvrage: 12345, thetvdb: 67890, imdb: 'tt1234567' },
  image: {
    medium: 'http://example.com/medium.jpg',
    original: 'http://example.com/original.jpg',
  },
  summary: 'Example summary.',
  updated: 1234567890,
  _links: {
    self: { href: 'http://example.com' },
    previousepisode: { href: 'http://example.com', name: 'Previous Episode' },
  },
};

it('should render show image when image is available', () => {
  const { getByAltText } = render(<ShowTile showResult={showResult} />);
  const imgElement = getByAltText('Example Show');
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute(
    'srcset',
    'http://example.com/medium.jpg 700w, http://example.com/original.jpg 1200w'
  );
});
