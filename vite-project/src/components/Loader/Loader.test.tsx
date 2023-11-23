import { cleanup, render, screen } from '@testing-library/react';
import Loader from './Loader';

afterEach(() => {
  cleanup();
});

describe('Test Loader component', () => {
  test('Component exists in the DOM', () => {
    render(<Loader />);
    const loaderComponent = screen.getByTestId('loader');
    expect(loaderComponent).toBeInTheDocument();
  });
});
