import { cleanup, render, screen } from '@testing-library/react';
import BoldText from './BoldText';

afterEach(() => {
  cleanup();
});

describe('Test BoldText component', () => {
  test('Component exists in the DOM', () => {
    const testText = 'test';
    render(<BoldText text={testText} />);
    const textComponent = screen.getByText(/test/i);
    expect(textComponent).toBeInTheDocument();
  });

  test('Component has exact class name', () => {
    const testText = 'test';
    render(<BoldText text={testText} />);
    const textComponent = screen.getByText(/test/i);
    expect(textComponent).toHaveClass('bold');
  });
});
