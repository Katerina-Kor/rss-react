import { cleanup, render, screen } from '@testing-library/react';
import Heading from './Heading';

afterEach(() => {
  cleanup();
});

describe('Test heading component', () => {
  test('Component exist in the DOM', () => {
    render(<Heading level={1} title="test" />);
    expect(screen.getByTestId('heading_1')).toBeInTheDocument();
  });

  test('Component renders heading level 2', () => {
    render(<Heading level={2} title="test" />);
    expect(screen.getByTestId('heading_2')).toBeInTheDocument();
  });

  test('Component renders heading level 3', () => {
    render(<Heading level={3} title="test" />);
    expect(screen.getByTestId('heading_3')).toBeInTheDocument();
  });

  test('Component renders heading level 4', () => {
    render(<Heading level={4} title="test" />);
    expect(screen.getByTestId('heading_4')).toBeInTheDocument();
  });

  test('Component renders heading level 5', () => {
    render(<Heading level={5} title="test" />);
    expect(screen.getByTestId('heading_5')).toBeInTheDocument();
  });

  test('Component renders heading level 6', () => {
    render(<Heading level={6} title="test" />);
    expect(screen.getByTestId('heading_6')).toBeInTheDocument();
  });

  test('Component renders heading level 1', () => {
    render(<Heading level={1} title="test" />);
    expect(screen.getByTestId('heading_1')).toBeInTheDocument();
  });

  test('Component renders relevant title', () => {
    render(<Heading level={2} title="heading" />);
    expect(screen.getByTestId('heading_2')).toHaveTextContent('heading');
  });
});
