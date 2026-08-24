import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the PayFlow product landing', () => {
  localStorage.clear();
  render(<App />);

  expect(screen.getByText(/una consola de pagos pensada como un producto real/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ingresar a la plataforma/i })).toBeInTheDocument();
});
