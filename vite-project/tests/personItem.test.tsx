import { cleanup, render, screen } from '@testing-library/react';
import PersonItem from '../src/components/PersonItem/PersonItem';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  cardsList10,
  fakeApiDetailedInfoResponse,
  fakeApiResponseWithCards,
} from './testData/testData';
import { getPeopleData, getDetailedPersonData } from '../src/api/apiRequests';
import PersonDataProvider from '../src/context/DataContext';
import userEvent from '@testing-library/user-event';
import MainPage from '../src/components/pages/MainPage';
import DetailedPersonItem from '../src/components/DetailedPersonItem/DetailedPersonItem';

jest.mock('../src/api/apiRequests', () => ({
  getPeopleData: jest.fn(),
  getDetailedPersonData: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const renderWithRouter = (component: JSX.Element) =>
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={component}>
          <Route index element={<DetailedPersonItem />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('Card component cases', () => {
  test('Card component exist in the DOM', () => {
    renderWithRouter(<PersonItem personData={cardsList10[0]} />);
    expect(screen.getByTestId<HTMLDivElement>('card_item')).toBeInTheDocument();
  });

  test('Card component renders the relevant card name', () => {
    renderWithRouter(<PersonItem personData={cardsList10[0]} />);
    expect(
      screen.getByTestId<HTMLParagraphElement>('card_name')
    ).toHaveTextContent('John');
  });

  test('Card component does not render the irrelevant card name', () => {
    renderWithRouter(<PersonItem personData={cardsList10[0]} />);
    expect(
      screen.getByTestId<HTMLParagraphElement>('card_name')
    ).not.toHaveTextContent('Mary');
  });
});

describe('Clicking on a card cases', () => {
  test('Clicking on a card opens a detailed card component', async () => {
    jest
      .mocked(getPeopleData)
      .mockResolvedValue(Promise.resolve(fakeApiResponseWithCards));
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));

    renderWithRouter(
      <PersonDataProvider>
        <MainPage />
      </PersonDataProvider>
    );
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('card_item');
    expect((await screen.findByTestId('detailed_card')).style.display).toBe(
      'none'
    );

    await user.click(cards[0]);

    expect((await screen.findByTestId('detailed_card')).style.display).toBe(
      'block'
    );
  });

  test('Clicking on a card triggers an additional API call to fetch detailed information', async () => {
    jest
      .mocked(getPeopleData)
      .mockResolvedValue(Promise.resolve(fakeApiResponseWithCards));
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));

    renderWithRouter(
      <PersonDataProvider>
        <MainPage />
      </PersonDataProvider>
    );
    const user = userEvent.setup();
    const cards = await screen.findAllByTestId('card_item');

    expect(getDetailedPersonData).not.toHaveBeenCalled();

    await user.click(cards[0]);

    expect(getDetailedPersonData).toHaveBeenCalledTimes(1);
  });
});
