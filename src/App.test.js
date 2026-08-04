import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /velkommen til min portfolio/i })
  ).toBeInTheDocument();
});
