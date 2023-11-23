import { cleanup, render, screen } from '@testing-library/react';
import Cover from './Cover';
import SearchParamsDisplay from '../../../tests/helpers/SearchParamsDisplay';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

describe('Test Cover component', () => {
  test('Component exists in the DOM', () => {
    render(
      <MemoryRouter>
        <Cover />
      </MemoryRouter>
    );
    const coverComponent = screen.getByTestId('cover-elem');
    expect(coverComponent).toBeInTheDocument();
  });

  test('Component are visible if search params have "details"', () => {
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Cover />
      </MemoryRouter>
    );
    const coverComponent = screen.getByTestId('cover-elem');
    expect(coverComponent).toHaveClass('cover_visible');
  });

  test('Component are invisible if search params do not have "details"', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Cover />
      </MemoryRouter>
    );
    const coverComponent = screen.getByTestId('cover-elem');
    expect(coverComponent).not.toHaveClass('cover_visible');
  });

  test('Click to the component make it invisible', async () => {
    render(
      <MemoryRouter initialEntries={['/?details']}>
        <Cover />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cover-elem')).toHaveClass('cover_visible');
    await userEvent.click(screen.getByTestId('cover-elem'));
    expect(screen.getByTestId('cover-elem')).not.toHaveClass('cover_visible');
  });

  test('Click to the component delete "details" from search params', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1&details=1']}>
        <Cover />
        <SearchParamsDisplay />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-params-display')).toHaveTextContent(
      '?page=1&details=1'
    );
    await userEvent.click(screen.getByTestId('cover-elem'));
    expect(screen.getByTestId('search-params-display')).toHaveTextContent(
      '?page=1'
    );
  });
});
