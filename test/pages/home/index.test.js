import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../../../src/pages/home/index'; 
import { getLatLonForCity, fetchLocations } from '../../../src/pages/home/index'; 

jest.mock('../../../src/pages/home/index', () => ({
  getLatLonForCity: jest.fn(),
  fetchLocations: jest.fn(),
}));

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    // Check if any part of the text "NOTIFY ME" is present in the document
    expect(screen.getByText(/notify me/i)).toBeInTheDocument();
  });

  it('fetches and displays locations on load', async () => {
    fetchLocations.mockResolvedValue([
      { id: '1', name: 'Place 1', address: 'Address 1', latitude: 6.552706, longitude: 3.390368 },
      { id: '2', name: 'Place 2', address: 'Address 2', latitude: 6.54321, longitude: 3.12345 },
    ]);

    render(<Home />);

    await waitFor(() => {
      // Check if any part of the text "Place 1" and "Place 2" is present in the document
      expect(screen.getByText(/place 1/i)).toBeInTheDocument();
      expect(screen.getByText(/place 2/i)).toBeInTheDocument();
    });
  });

  it('handles form submission and fetches coordinates', async () => {
    getLatLonForCity.mockResolvedValue({ lat: 6.5244, lng: 3.3792 });

    render(<Home />);
    
    fireEvent.change(screen.getByPlaceholderText('Type in your location'), {
      target: { value: 'Lagos' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(getLatLonForCity).toHaveBeenCalledWith('Lagos');
    });
  });
});
