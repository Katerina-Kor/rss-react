import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailedPersonItem from '../src/components/DetailedPersonItem/DetailedPersonItem';
import { getDetailedPersonData } from '../src/api/apiRequests';
import { fakeApiDetailedInfoResponse } from './testData/testData';
import userEvent from '@testing-library/user-event';

jest.mock('../src/api/apiRequests', () => ({
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
    <MemoryRouter initialEntries={['/?details=1']}>
      <Routes>
        <Route path="/" element={component}>
          <Route index element={<DetailedPersonItem />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('Detailed card component cases', () => {
  test('Detailed card component exist in the DOM', async () => {
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));
    renderWithRouter(<DetailedPersonItem />);
    expect(
      await screen.findByTestId<HTMLDivElement>('detailed_card')
    ).toBeInTheDocument();
  });

  test('Detailed card component renders the relevant card name', async () => {
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));
    renderWithRouter(<DetailedPersonItem />);
    expect(
      await screen.findByTestId<HTMLParagraphElement>('detailed_card_name')
    ).toHaveTextContent('John');
  });

  test('Detailed card component does not render the irrelevant card name', async () => {
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));
    renderWithRouter(<DetailedPersonItem />);
    expect(
      await screen.findByTestId<HTMLParagraphElement>('detailed_card_name')
    ).not.toHaveTextContent('Mary');
  });

  test('Detailed card component renders loader while fetching data', async () => {
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));
    renderWithRouter(<DetailedPersonItem />);
    expect(screen.getByTestId<HTMLDivElement>('loader')).toBeInTheDocument();
    expect(
      await screen.findByTestId<HTMLDivElement>('loader')
    ).not.toBeInTheDocument();
  });
});

describe('Clicking on the detailed card', () => {
  test('clicking the close button hides the detailed card component', async () => {
    jest
      .mocked(getDetailedPersonData)
      .mockResolvedValue(Promise.resolve(fakeApiDetailedInfoResponse));
    renderWithRouter(<DetailedPersonItem />);
    const user = userEvent.setup();
    const closeButton =
      await screen.findByTestId<HTMLDivElement>('close_button');
    expect((await screen.findByTestId('detailed_card')).style.display).toBe(
      'block'
    );

    await user.click(closeButton);

    expect((await screen.findByTestId('detailed_card')).style.display).toBe(
      'none'
    );
  });
});
