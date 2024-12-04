import { render, screen, fireEvent } from '@testing-library/react';
import AdvocateList from './AdvocateList';
import { type Advocate } from '@/types/Advocate';

jest.mock('@/contexts/AdvocateContext', () => ({
  useAdvocates: jest.fn()
}));

import { useAdvocates } from '@/contexts/AdvocateContext';

const mockUseAdvocates = useAdvocates as jest.Mock;

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Family Law'],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
    createdAt: new Date()
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'PhD',
    specialties: ['Criminal Law'],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
    createdAt: new Date()
  }
];

describe('AdvocateList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseAdvocates.mockReturnValue({
      advocates: [],
      searchTerm: '',
      isLoading: true
    });

    render(<AdvocateList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders empty state when no advocates match search', () => {
    mockUseAdvocates.mockReturnValue({
      advocates: mockAdvocates,
      searchTerm: 'NonExistentName',
      isLoading: false
    });

    render(<AdvocateList />);

    expect(screen.getByText('No Advocate found!')).toBeInTheDocument();
  });

  test('renders advocates list correctly', () => {
    mockUseAdvocates.mockReturnValue({
      advocates: mockAdvocates,
      searchTerm: '',
      isLoading: false
    });

    render(<AdvocateList />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
  });

  test('filters advocates based on search term', () => {
    mockUseAdvocates.mockReturnValue({
      advocates: mockAdvocates,
      searchTerm: 'john',
      isLoading: false
    });

    render(<AdvocateList />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  test('handles pagination correctly', () => {
    const manyAdvocates = Array(10).fill(null).map((_, index) => ({
      ...mockAdvocates[0],
      id: index + 1,
      firstName: `John${index}`,
      lastName: `Doe${index}`
    }));

    mockUseAdvocates.mockReturnValue({
      advocates: manyAdvocates,
      searchTerm: '',
      isLoading: false
    });

    render(<AdvocateList />);

    expect(screen.getByText('John0')).toBeInTheDocument();
    expect(screen.queryByText('John5')).not.toBeInTheDocument();

    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageButton);

    expect(screen.queryByText('John0')).not.toBeInTheDocument();
    expect(screen.getByText('John5')).toBeInTheDocument();
  });

  test('handles rows per page change', () => {
    const manyAdvocates = Array(15).fill(null).map((_, index) => ({
      ...mockAdvocates[0],
      id: index + 1,
      firstName: `John${index}`,
      lastName: `Doe${index}`
    }));

    mockUseAdvocates.mockReturnValue({
      advocates: manyAdvocates,
      searchTerm: '',
      isLoading: false
    });

    render(<AdvocateList />);

    expect(screen.getByText('John0')).toBeInTheDocument();
    expect(screen.queryByText('John5')).not.toBeInTheDocument();

    const select = screen.getByLabelText(/rows per page/i);
    fireEvent.mouseDown(select);
    const option = screen.getByRole('option', { name: '10' });
    fireEvent.click(option);

    expect(screen.getByText('John0')).toBeInTheDocument();
    expect(screen.getByText('John9')).toBeInTheDocument();
    expect(screen.queryByText('John10')).not.toBeInTheDocument();
  });
});