import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailedPersonItem from './DetailedPersonItem';
import { fakeApiDetailedInfoResponse } from '../../../tests/testData/testData';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('https://the-one-api.dev/v2/character/1', async () => {
    await delay(150);
    return HttpResponse.json(fakeApiDetailedInfoResponse);
  }),
];

const server = setupServer(...handlers);

describe('Test DetailedPersonItem component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  afterEach(() => {
    cleanup();
  });

  test('Component exist in the DOM', async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailedPersonItem />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByTestId('detailed_card')).toBeInTheDocument();
  });

  test('Component renders the relevant card name', async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailedPersonItem />
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByTestId<HTMLParagraphElement>('detailed_card_name')
    ).toHaveTextContent('John');
  });

  test('Component does not render the irrelevant card name', async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailedPersonItem />
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByTestId<HTMLParagraphElement>('detailed_card_name')
    ).not.toHaveTextContent('Mary');
  });

  test('Component renders loader while fetching data', async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailedPersonItem />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId<HTMLDivElement>('loader')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByTestId<HTMLDivElement>('loader')
      ).not.toBeInTheDocument();
    });
  });

  test('Click the close button hides the detailed card component', async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailedPersonItem />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const closeButton =
      await screen.findByTestId<HTMLDivElement>('close_button');
    expect(await screen.findByTestId('detailed_card')).toHaveStyle(
      'display: block'
    );

    await user.click(closeButton);

    expect(await screen.findByTestId('detailed_card')).toHaveStyle(
      'display: none'
    );
  });
});
