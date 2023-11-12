import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../src/components/Pagination/Pagination';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const renderWithRouter = (component: JSX.Element) =>
  render(
    <MemoryRouter initialEntries={['/?page=2']}>{component}</MemoryRouter>
  );

describe('Pagination component cases', () => {
  test('Pagination component exist in the DOM', async () => {
    renderWithRouter(<Pagination pagesNumber={5} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('Pagination component shows current active page', async () => {
    renderWithRouter(<Pagination pagesNumber={5} />);
    expect(screen.getByTestId('2')).toHaveClass('button_current');
  });

  test('Pagination component renders relevant pages', async () => {
    renderWithRouter(<Pagination pagesNumber={5} />);
    expect(screen.getByTestId('pagination').childElementCount).toBe(7);
  });
});
