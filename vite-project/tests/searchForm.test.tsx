import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '../src/components/Forms/SearchForm/SearchForm';
import SearchValueProvider from '../src/context/SearchContext';
import userEvent from '@testing-library/user-event';

const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  return { setItemMock, getItemMock };
};

const { setItemMock } = mockLocalStorage();

const mockedFunc = () => {};

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const renderWithRouter = (component: JSX.Element) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

describe('Pagination component cases', () => {
  test('Pagination component exist in the DOM', async () => {
    const key = 'savedSearchText';
    renderWithRouter(
      <SearchValueProvider>
        <SearchForm isLoading={false} setError={mockedFunc} />
      </SearchValueProvider>
    );
    const user = userEvent.setup();
    await user.type(screen.getByTestId('input'), 'test');
    expect(screen.getByTestId('input')).toHaveValue('test');
    await user.click(screen.getByRole('button'));
    expect(setItemMock).toHaveBeenCalledWith(key, 'test');
  });
});
