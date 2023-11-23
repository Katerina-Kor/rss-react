import {
  cleanup,
  // render,
  // screen,
  // waitFor
} from '@testing-library/react';
// import PersonItemList from '../../src/components/PersonItemList/PersonItemList';
// import PersonDataProvider, {
//   PersonDataContext,
// } from '../../src/context/DataContext';
// import { MemoryRouter } from 'react-router-dom';
// import {
//   cardsList10,
//   cardsList20,
//   fakeApiResponseWithCards,
//   fakeApiResponseWithoutCards,
// } from '../testData/testData';
// import InfoBlock from '../../src/components/InfoBlock/InfoBlock';
// import { getPeopleData } from '../../src/api/apiRequests';

// jest.mock('../../src/api/apiRequests', () => ({
//   getPeopleData: jest.fn(),
// }));

// const mockedFunc = () => {};

afterEach(() => {
  cleanup();
});

// const renderWithRouter = (component: JSX.Element) =>
//   render(<MemoryRouter>{component}</MemoryRouter>);

describe('Card list component renders the specified number of cards', () => {
  // test('Card list component renders 10 cards', () => {
  //   renderWithRouter(
  //     <PersonDataContext.Provider value={cardsList10}>
  //       <PersonItemList />
  //     </PersonDataContext.Provider>
  //   );
  //   expect(screen.getAllByTestId<HTMLDivElement>('card_item').length).toBe(10);
  // });
  // test('Card list component renders 20 cards', () => {
  //   renderWithRouter(
  //     <PersonDataContext.Provider value={cardsList20}>
  //       <PersonItemList />
  //     </PersonDataContext.Provider>
  //   );
  //   expect(screen.getAllByTestId<HTMLDivElement>('card_item').length).toBe(20);
  // });
});

describe('Card list component renders the specified message if no cards are present', () => {
  // test('Card list component does not render the specified message if cards are present', async () => {
  //   jest
  //     .mocked(getPeopleData)
  //     .mockResolvedValue(Promise.resolve(fakeApiResponseWithCards));
  //   renderWithRouter(
  //     <PersonDataProvider>
  //       <InfoBlock
  //         isLoading={false}
  //         setIsLoading={mockedFunc}
  //         setError={mockedFunc}
  //         error={null}
  //       />
  //     </PersonDataProvider>
  //   );
  //   await waitFor(() =>
  //     expect(screen.queryByText(/No such hero/)).not.toBeInTheDocument()
  //   );
  // });
  // test('Card list component renders the specified message if no cards are present', async () => {
  //   jest
  //     .mocked(getPeopleData)
  //     .mockResolvedValue(Promise.resolve(fakeApiResponseWithoutCards));
  //   renderWithRouter(
  //     <PersonDataProvider>
  //       <InfoBlock
  //         isLoading={false}
  //         setIsLoading={mockedFunc}
  //         setError={mockedFunc}
  //         error={null}
  //       />
  //     </PersonDataProvider>
  //   );
  //   await waitFor(() =>
  //     expect(screen.queryByText(/No such hero/)).toBeInTheDocument()
  //   );
  // });
});
