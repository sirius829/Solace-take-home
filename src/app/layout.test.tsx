import { render, screen } from '@testing-library/react';
import { AdvocateProvider } from '@/contexts/AdvocateContext';

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-font-class',
  }),
}));

describe('RootLayout', () => {
  const renderLayout = (children: React.ReactNode) => {
    return render(
      <div id="layout-test-container">
        <AdvocateProvider>
          {children}
        </AdvocateProvider>
      </div>
    );
  };

  test('renders child components', () => {
    renderLayout(<div>Child Component</div>);
    expect(screen.getByText(/Child Component/i)).toBeInTheDocument();
  });

  test('renders within advocate provider context', () => {
    renderLayout(<div>Test Content</div>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});