import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/nav';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Hi Michael!')).toBeInTheDocument();
  });

  it('toggles the mobile menu correctly', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
