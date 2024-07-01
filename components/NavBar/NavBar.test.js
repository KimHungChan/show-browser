import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from './NavBar';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

it('should render without crashing', () => {
  const { container } = render(<NavBar />);
  expect(container).toBeInTheDocument();
});

it('should display the title "TV SHOWS"', () => {
  render(<NavBar />);
  expect(screen.getByText('TV SHOWS')).toBeInTheDocument();
});
